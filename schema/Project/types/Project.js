// @flow
import gql from './../../../utils/gql'

export const Project = gql`
    enum Status {  
        ACTIVE
        SCHEDULED
        COMPLETE
        ABANDONED
        NONE
    }
    type Project {
        id: String,
        name: String,
        description: String,
        status: Status
        archived: Boolean
    }
`

Project.id = (root, params, context) => {
    return root._id
}

Project.description = (root, params, context) => {
    return root.description || ""
}