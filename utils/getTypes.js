// @flow
import _ from "lodash"
import type { Schema } from "./../types/schema"

type GraphQLType = {
  schema: Array<string>,
  resolvers: {
    [typeName: string]: {
      [fieldName: string]: Function
    }
  }
}

export const getTypes = (schemaMap: Schema): GraphQLType =>
  _.keys(schemaMap).reduce(
    (types, key) => {
      const obj = schemaMap[key]
      if (obj.types) {
        types.schema = [
          ...types.schema,
          ..._.keys(obj.types).map(_type => obj.types[_type]._schema)
        ]
        types.resolvers = {
          ...types.resolvers,
          ..._.keys(obj.types).reduce((_types, _type) => {
            _types[_type] = _.omit(obj.types[_type], "_schema")
            return _types
          }, {})
        }
      }
      return types
    },
    { schema: [], resolvers: {} }
  )
