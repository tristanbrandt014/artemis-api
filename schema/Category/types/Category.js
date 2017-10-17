// @flow
import gql from "./../../../utils/gql"

export const Category = gql`
  type Category {
    id: String
    name: String
    color: String
  }
`

Category.id = (root) => {
  return root._id
}