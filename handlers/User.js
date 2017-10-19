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

type UpdateSettingsType = ({
  settings: {
    startup: {
      type: string,
      value?: string
    }
  }
}) => Promise<UserType>

const updateSettings = (user_id: string): UpdateSettingsType => async args => {
  const db = await getDb()
  const User = db.collection("user")

  const fields = {
    ...(args.settings.startup ? { startup: args.settings.startup } : {})
  }
  await User.update({ _id: ObjectId(user_id) }, { $set: { ...fields } })
  const result = await fetch(user_id)
  
  return result
}

export default {
  fetch,
  updateSettings
}
