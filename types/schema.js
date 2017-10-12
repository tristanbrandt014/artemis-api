// @flow
type GraphQLObject =  {} | {
    _schema: string,
    [resolver: string]: Function
}

export type Schema = {
    [type: string]: {
        queries: GraphQLObject,
        mutations: GraphQLObject,
        types: {
            [type: string]: GraphQLObject
        }
    }
}