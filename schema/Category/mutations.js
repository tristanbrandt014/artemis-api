// @flow
import gql from "./../../utils/gql"

export const Mutation = gql`
    extend type Mutation {
        # Create a category
        createCategory(name: String!, color: String): Category
        # Update a category
        updateCategory(
            id: String!
            name: String
            color: String
        ): Category
        # Destroy a category
        destroyCategory(id: String!): Category
    }
`

Mutation.createCategory = (root, params, context) => {
    return context.handlers.Category.create(context.id)(params)
}

Mutation.updateCategory = (root, params, context) => {
    return context.handlers.Category.update(context.id)(params)
}

Mutation.destroyCategory = (root, params, context) => {
    return context.handlers.Category.destroy(context.id)(params)
}