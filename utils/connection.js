// @flow

import { MongoClient } from "mongodb"
import config from "./../config"

var db

export const getDb = () => db
export const connect = () => {
  db = MongoClient.connect(config.database.url)
  db.then(() => console.log("Connected to DB")).catch(err => console.log(err))
}
