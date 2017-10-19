// @flow
import gql from "./../../utils/gql"

export const Mutation = gql`
  # Todo Input
  input TodoInput {
    description: String
    done: Boolean
  }

  extend type Mutation {
    # Create a note
    createNote(
      name: String!
      body: String
      todos: [TodoInput]
      project_id: String
    ): Note
    # Update a note
    updateNote(
      id: String!
      name: String
      body: String
      todos: [TodoInput]
    ): Note
    # Destroy a note
    destroyNote(id: String!): Note
  }
`

Mutation.createNote = (root, params, context) => {
  return context.handlers.Note.create(context.id)(params)
}

Mutation.updateNote = (root, params, context) => {
  return context.handlers.Note.update(context.id)(params)
}

Mutation.destroyNote = (root, params, context) => {
  return context.handlers.Note.destroy(context.id)(params)
}
