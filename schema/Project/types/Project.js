// @flow
import gql from './../../../utils/gql'

export const Project = gql`
    enum Status {  
        ACTIVE
        SCHEDULED
        COMPLETE
        ABANDONED
    }
    type Project {
        id: string,
        name: string,
        description: string,
        status: Status
        archived: Boolean
    }
`

Project.id = (root, params, context) => {
    console.log(root)
    return root.id
}