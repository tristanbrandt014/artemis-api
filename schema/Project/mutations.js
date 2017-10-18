// @flow
import gql from "./../../utils/gql"

export const Mutation = gql`
  extend type Mutation {
    # Create a Project
    createProject(name: String, category: String): Project
    # Update a Project. id is required
    updateProject(
      id: String!
      name: String
      description: String
      status: String
      archived: Boolean
      category: String
    ): Project
    # Destroy a Project
    destroyProject(id: String!): Project
  }
`

Mutation.createProject = (root, params, context) => {
  return context.handlers.Project.create(context.id)(params)
}

Mutation.updateProject = (root, params, context) => {
  return context.handlers.Project.update(context.id)(params)
}

Mutation.destroyProject = (root, params, context) => {
  return context.handlers.Project.destroy(context.id)(params)
}
