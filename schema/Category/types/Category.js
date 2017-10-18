// @flow
import gql from "./../../../utils/gql"

export const Category = gql`
  type Category {
    id: String
    name: String
    color: String
    projects: [Project]
  }
`

Category.id = root => {
  return root._id
}

Category.projects = (root, params, context) => {
  return root.project_ids
    ? context.handlers.Project.fetch(context.id)({ ids: root.project_ids })
    : []
}
