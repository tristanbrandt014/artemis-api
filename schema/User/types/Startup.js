// @flow
import gql from "./../../../utils/gql"

export const Startup = gql`
  type Startup {
    type: String
    value: String
  }
`