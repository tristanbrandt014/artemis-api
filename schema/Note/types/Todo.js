// @flow
import gql from "./../../../utils/gql"

export const Todo = gql`
  type Todo {
    description: String
    done: Boolean
  }
`
