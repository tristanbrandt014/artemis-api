// @flow
import { MongoClient } from "mongodb"
import config from "./../config"

var db

export const getDb = function() {
  return db
}
export const connect = function() {
  db = MongoClient.connect(config.database.url)
}
