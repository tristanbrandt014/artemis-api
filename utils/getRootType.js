// @flow
import _ from "lodash"
import type { Schema } from "./../types/schema"

type RootType = {
  schema: Array<string>,
  resolvers: {
    [fieldName: string]: Function
  }
}

export const getRootType = (
  schemaMap: Schema,
  type: "queries" | "mutations"
): RootType =>
  _.keys(schemaMap).reduce(
    (rootType, key) => {
      const obj = schemaMap[key][type]
      if (obj._schema) {
        rootType.schema.push(obj._schema)
        rootType.resolvers = {
          ...rootType.resolvers,
          ..._.omit(obj, "_schema")
        }
      }
      return rootType
    },
    { schema: [], resolvers: {} }
  )
