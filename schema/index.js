// @flow
import {makeExecutableSchema} from 'graphql-tools'

import * as Project from './Project'

const baseSchema = `
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        init: Boolean
    }

    type Mutation {
        init: Boolean
    }
`

const baseResolvers = {
    Query: {
        init: () => true
    },
    Mutation: {
        init: () => true
    }
}

export default makeExecutableSchema({
    typeDefs: baseSchema,
    resolvers: baseResolvers
})