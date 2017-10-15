// @flow
import gql from "./../../../utils/gql"

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
  }
`

Project.id = root => {
  return root._id
}

Project.description = root => {
  return root.description || ""
}
