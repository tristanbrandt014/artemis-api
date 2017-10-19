// @flow
import { getDb } from "./../utils/connection"
import type { NoteType, TodoType } from "./../types/note"
import { ObjectId } from "mongodb"
import { Project } from "./"

type FetchType = ({
  ids: Array<string>
}) => Promise<Array<NoteType>>

const fetch = (user_id: string): FetchType => async args => {
  const db = await getDb()
  const Note = db.collection("note")

  const where = {
    user_id: ObjectId(user_id),
    ...(args.ids ? { _id: { $in: args.ids.map(ObjectId) } } : {})
  }

  const query = await Note.find(where)
  const result = await query.toArray()
  return result
}

type CreateType = ({
  name: string,
  body: string,
  project_id: string,
  todos?: Array<TodoType>
}) => Promise<NoteType>

const create = (user_id: string): CreateType => async args => {
  const db = await getDb()
  const Note = db.collection("note")

  const result = await Note.insert({
    ...args,
    user_id: ObjectId(user_id)
  })

  const note = result.ops[0]

  await addToProject(user_id)({
    note_id: note._id.toString(),
    project_id: args.project_id
  })

  return note
}

type UpdateType = ({
  id: string,
  name?: string,
  body?: string,
  todos?: Array<TodoType>
}) => Promise<NoteType>

const update = (user_id: string): UpdateType => async args => {
  const db = await getDb()
  const Note = db.collection("note")

  const { id, ...rest } = args
  await Note.update(
    { _id: ObjectId(id), user_id: ObjectId(user_id) },
    { $set: { ...rest } }
  )
  const result = await fetch(user_id)({ ids: [id] })

  return result[0]
}

type DestroyType = ({
  id: string
}) => Promise<NoteType>

const destroy = (user_id: string): DestroyType => async args => {
  const db = await getDb()
  const Note = db.collection("note")

  await removeFromProject(user_id, args.id)

  const result = await fetch(user_id)({ ids: [args.id] })
  await Note.remove({ _id: ObjectId(args.id) })
  return result[0]
}

type AddToProjectType = ({
  note_id: string,
  project_id: string
}) => Promise<Object>

const addToProject = (user_id: string): AddToProjectType => async args => {
  const result = await Project.addNote(user_id)({
    note_id: args.note_id,
    project_id: args.project_id
  })
  return result
}

type RemoveFromProjectType = (
  user_id: string,
  note_id: string
) => Promise<Object>

const removeFromProject: RemoveFromProjectType = async (user_id, note_id) => {
  const result = await Project.removeNote(user_id, note_id)
  return result
}

export default {
  fetch,
  create,
  update,
  destroy,
  addToProject
}
