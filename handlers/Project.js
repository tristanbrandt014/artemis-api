// @flow
import { getDb } from "./../utils/connection"
import type { ProjectType } from "./../types/project"
import { ObjectId } from "mongodb"
import { Category, User } from "./"
import _ from "lodash"

type CreateType = ({
  name: string,
  category?: string
}) => Promise<ProjectType>

const create = (user_id: string): CreateType => async args => {
  const db = await getDb()
  const Project = db.collection("project")

  const result = await Project.insert({
    ...args,
    description: "",
    status: "NONE",
    archived: false,
    user_id: ObjectId(user_id)
  })

  const project = result.ops[0]

  if (args.category) {
    await addToCategory(user_id)({
      project_id: project._id.toString(),
      category_id: args.category || ""
    })
  }

  User.updateVersion(user_id)
  return project
}

type FetchType = ({
  ids?: Array<string>,
  category?: string, // Category ID
  archived?: boolean,
  note_id?: string
}) => Promise<Array<ProjectType>>

const fetch = (user_id: string): FetchType => async args => {
  const db = await getDb()
  const Project = db.collection("project")

  let constraints
  if (args.category) {
    const category_projects = await Category.fetch(user_id)({
      id: args.category
    })
    constraints = category_projects[0].project_ids
  }

  const where = {
    user_id: ObjectId(user_id),
    ...(args.ids ? { _id: { $in: args.ids.map(ObjectId) } } : {}),
    ...(typeof args.archived === "boolean" ? { archived: args.archived } : {}),
    ...(args.note_id ? { note_ids: ObjectId(args.note_id) } : {}),
    ...(constraints ? { _id: { $in: constraints } } : {})
  }

  const query = await Project.find(where)
  const result = await query.toArray()
  return result
}

type UpdateType = ({
  id: string,
  name?: string,
  description?: string,
  status?: string,
  archived?: boolean,
  category?: string,
  summary?: string
}) => Promise<ProjectType>

const update = (user_id: string): UpdateType => async args => {
  const db = await getDb()
  const Project = db.collection("project")

  const { id, ...rest } = args
  await Project.update(
    { _id: ObjectId(id), user_id: ObjectId(user_id) },
    { $set: { ..._.omit(rest, "category") } }
  )
  const result = await fetch(user_id)({ ids: [id] })

  if (args.category) {
    await removeFromCategories(user_id, id)
    await addToCategory(user_id)({
      project_id: id,
      category_id: args.category || ""
    })
  } else if (args.category === ""){
    await removeFromCategories(user_id, id)
  }
  User.updateVersion(user_id)  
  return result[0]
}

type DestroyType = ({
  id: string
}) => Promise<ProjectType>

const destroy = (user_id: string): DestroyType => async args => {
  const db = await getDb()
  const Project = db.collection("project")

  await removeFromCategories(user_id, args.id)

  const result = await fetch(user_id)({ ids: [args.id] })
  await Project.remove({ _id: ObjectId(args.id) })
  User.updateVersion(user_id)  
  return result[0]
}

type AddToCategoryType = ({
  project_id: string,
  category_id: string
}) => Promise<Object>

const addToCategory = (user_id: string): AddToCategoryType => async args => {
  const result = await Category.addProject(user_id)({
    project_id: args.project_id,
    category_id: args.category_id
  })
  User.updateVersion(user_id)  
  return result
}

type RemoveFromCategoriesType = (
  user_id: string,
  project_id: string
) => Promise<Object>

const removeFromCategories: RemoveFromCategoriesType = async (
  user_id,
  project_id
) => {
  const result = await Category.removeProjects(user_id, project_id)
  User.updateVersion(user_id)  
  return result
}

type AddNoteType = ({ note_id: string, project_id: string }) => Promise<Object>

export const addNote = (user_id: string): AddNoteType => async args => {
  const db = await getDb()
  const Project = db.collection("project")

  const result = await Project.update(
    {
      user_id: ObjectId(user_id),
      _id: ObjectId(args.project_id)
    },
    {
      $push: {
        note_ids: ObjectId(args.note_id)
      }
    }
  )
  User.updateVersion(user_id)  
  return result[0]
}

type RemoveNoteType = (user_id: string, note_id: string) => Promise<Object>

export const removeNote: RemoveNoteType = async (user_id, note_id) => {
  const db = await getDb()
  const Project = db.collection("project")

  const result = await Project.findOneAndUpdate(
    {
      user_id: ObjectId(user_id),
      note_ids: ObjectId(note_id)
    },
    {
      $pull: {
        note_ids: ObjectId(note_id)
      }
    }
  )
  User.updateVersion(user_id)  
  return result.value
}

export default {
  create,
  fetch,
  update,
  destroy,
  addNote,
  removeNote
}
