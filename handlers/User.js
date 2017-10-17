// @flow
import { getDb } from "./../utils/connection"
import type { UserType } from "./../types/user"
import { ObjectId } from "mongodb"

type FetchType = (id: string) => Promise<UserType>
const fetch: FetchType = async id => {
  const db = await getDb()
  const User = db.collection("user")

  const query = await User.find({ _id: ObjectId(id) })
  const result = await query.toArray()
  return result[0]
}

export default {
  fetch
}
