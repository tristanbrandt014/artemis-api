// @flow
import gql from "./../../../utils/gql"
import _ from 'lodash'

export const Project = gql`
  enum Status {
    ACTIVE
    SCHEDULED
    COMPLETE
    ABANDONED
    NONE
  }

  type Project {
    id: String
    name: String
    description: String
    status: Status
    archived: Boolean
    category: Category
  }
`

Project.id = root => {
  return root._id
}

Project.description = root => {
  return root.description || ""
}

Project.category = async (root, params, context) => {
  const categories = await context.handlers.Category.fetch(context.id)({
    project: root._id.toString()
  })
  return _.get(categories, "[0]")
}
