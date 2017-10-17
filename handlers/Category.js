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
  name?: string
}) => Promise<Array<CategoryType>>

const fetch = (user_id: string): FetchType => async args => {
  const db = await getDb()
  const Category = db.collection("category")

  const where = {
    user_id: ObjectId(user_id),
    ...(args.id ? { _id: ObjectId(args.id) } : {}),
    ...(args.name ? { name: args.name } : {})
  }

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

export default {
  create,
  fetch,
  update,
  destroy
}
