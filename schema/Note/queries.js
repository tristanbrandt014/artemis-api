// @flow
import gql from './../../utils/gql'

export const Query = gql`
    extend type Query {
        Notes(ids: [String]): [Note]
    }
`

Query.Notes = async (root, params, context) => {
    const res = await context.handlers.Note.fetch(context.id)(params)
    return res
}
