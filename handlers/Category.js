// @flow
import { getDb } from "./../utils/connection"
import type { CategoryType } from "./../types/category"
import { ObjectId } from "mongodb"

type CreateType = ({
  name: string,
  color: string
}) => Promise<CategoryType>

const create = (user_id: string): CreateType => async args => {
  const db = await getDb()
  const Category = db.collection("category")

  const result = await Category.insert({
    ...args,
    user_id: ObjectId(user_id)
  })
  return result.ops[0]
}

type FetchType = ({
  id?: string,
  name?: string,
  project?: string
}) => Promise<Array<CategoryType>>

const fetch = (user_id: string): FetchType => async args => {
  const db = await getDb()
  const Category = db.collection("category")

  const where = {
    user_id: ObjectId(user_id),
    ...(args.id ? { _id: ObjectId(args.id) } : {}),
    ...(args.name ? { name: args.name } : {}),
    ...(args.project ? { project_ids: ObjectId(args.project) } : {})
  }

  console.log(where)

  const query = await Category.find(where)
  const result = await query.toArray()
  return result
}

type UpdateType = ({
  id: string,
  name?: string,
  color?: string
}) => Promise<CategoryType>

const update = (user_id: string): UpdateType => async args => {
  const db = await getDb()
  const Category = db.collection("category")

  const { id, ...rest } = args
  await Category.update(
    { _id: ObjectId(id), user_id: ObjectId(user_id) },
    { $set: { ...rest } }
  )
  const result = await fetch(user_id)({ id })
  return result[0]
}

type DestroyType = ({ id: string }) => Promise<CategoryType>

const destroy = (user_id: string): DestroyType => async args => {
  const db = await getDb()
  const Category = db.collection("category")

  const result = await fetch(user_id)({ id: args.id })
  await Category.remove({ _id: ObjectId(args.id) })
  return result[0]
}

type AddProjectType = ({ project_id: string, category_id: string }) => Promise<
  Object
>

export const addProject = (user_id: string): AddProjectType => async args => {
  const db = await getDb()
  const Category = db.collection("category")

  const result = await Category.update(
    {
      user_id: ObjectId(user_id),
      _id: ObjectId(args.category_id)
    },
    {
      $push: {
        project_ids: ObjectId(args.project_id)
      }
    }
  )
  return result[0]
}

type RemoveProjectsType = (
  user_id: string,
  project_id: string
) => Promise<Object>

export const removeProjects: RemoveProjectsType = async (
  user_id,
  project_id
) => {
  const db = await getDb()
  const Category = db.collection("category")

  const result = await Category.update(
    {
      user_id: ObjectId(user_id)
    },
    {
      $pull: {
        project_ids: ObjectId(project_id)
      }
    }
  )
  return result[0]
}

export default {
  create,
  fetch,
  update,
  destroy,
  addProject,
  removeProjects
}
