// @flow
const gql = (schema: any) => {
  const resolversWithSchema: {
    _schema: string,
    [key: string]: (root: Object, params: Object, context: Object) => any
  } = {
    _schema: schema.raw[0]
  }
  return resolversWithSchema
}

export default gql