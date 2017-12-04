// @flow
import gql from './../../utils/gql'

export const Query = gql`
    extend type Query {
        Projects(ids: [String], category: String, archived: Boolean): [Project]
    }
`

Query.Projects = async (root, params, context) => {
    const res = await context.handlers.Project.fetch(context.id)(params)
    return res
}
