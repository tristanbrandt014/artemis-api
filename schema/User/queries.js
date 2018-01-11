// @flow
import gql from './../../utils/gql'

export const Query = gql`
    extend type Query {
        User: User
    }
`

Query.User = (root, params, context) => {
    return context.handlers.User.fetch(context.id)
}