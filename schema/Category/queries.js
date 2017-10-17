// @flow
import gql from './../../utils/gql'

export const Query = gql`
    extend type Query {
        Categories(id: String, name: String): [Category]
    }
`

Query.Categories = (root, params, context) => {
    return context.handlers.Category.fetch(context.id)(params)
}
