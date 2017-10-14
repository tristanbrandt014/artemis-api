// @flow
import { getDb } from "./../utils/connection"
import type { ProjectType } from "./../types/project"
import { ObjectId } from "mongodb"

type CreateType = ({
  name: string,
  categories?: Array<string>
}) => Promise<ProjectType>

const create: CreateType = async args => {
  const db = await getDb()
  const Project = db.collection("project")

  const result = await Project.insert({
    ...args,
    description: "",
    status: "NONE",
    archived: false
  })
  return result.ops[0]
}

type FetchType = ({
  id?: string
}) => Promise<Array<ProjectType>>

const fetch: FetchType = async args => {
  const db = await getDb()
  const Project = db.collection("project")

  const where = {
    ...(args.id ? { _id: ObjectId(args.id) } : {})
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
  archived?: boolean
}) => Promise<ProjectType>

const update: UpdateType = async args => {
  const db = await getDb()
  const Project = db.collection("project")

  const { id, ...rest } = args
  await Project.update({ _id: ObjectId(id) }, { $set: { ...rest } })
  const result = await fetch({id})
  return result[0]
}

type DestroyType = ({
  id: string
}) => Promise<ProjectType>

const destroy: DestroyType = async args => {
  const db = await getDb()
  const Project = db.collection("project")
  
  const result = await fetch({id: args.id})
  await Project.remove({ _id: ObjectId(args.id) })
  return result[0]
}

export default {
  create,
  fetch,
  update,
  destroy
}
