// @flow
import gql from './../../utils/gql'

export const Mutation = gql`
    extend type Mutation {
        createProject(name: String): Project
    }
`

Mutation.createProject = (root, params, context) => {

}
