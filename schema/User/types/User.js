// @flow
import gql from "./../../../utils/gql"

export const User = gql`
  type User {
    id: String
    firstname: String
    lastname: String
    email: String
    startup: Startup
    dataVersion: String
  }
`

User.id = root => {
  return root._id
}