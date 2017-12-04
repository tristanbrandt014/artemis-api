// @flow
import gql from "./../../../utils/gql"
import _ from "lodash"

export const Project = gql`
  enum Status {
    ACTIVE
    TODO
    COMPLETE
    ABANDONED
    NONE
  }

  type Project {
    id: String
    name: String
    description: String
    summary: String
    status: Status
    archived: Boolean
    category: Category
    notes: [Note]
  }
`

Project.id = root => {
  return root._id
}

Project.description = root => {
  return root.description || ""
}

Project.summary = root => {
  return root.summary || ""
}

Project.category = async (root, params, context) => {
  const categories = await context.handlers.Category.fetch(context.id)({
    project: root._id.toString()
  })
  return _.get(categories, "[0]")
}

Project.notes = async (root, params, context) => {
  return root.note_ids
    ? context.handlers.Note.fetch(context.id)({
        ids: root.note_ids.map(id => id.toString())
      })
    : []
}
