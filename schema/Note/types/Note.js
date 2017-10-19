// @flow
import gql from "./../../../utils/gql"

export const Note = gql`
  type Note {
    id: String
    name: String
    body: String
    todos: [Todo]
  }
`

Note.id = root => {
  return root._id
}