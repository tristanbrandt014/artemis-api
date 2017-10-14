// @flow
import gql from './../../utils/gql'

export const Query = gql`
    extend type Query {
        Projects(id: String): [Project]
    }
`

Query.Projects = (root, params, context) => {
    return context.handlers.Project.fetch(params)
}
