// @flow
import {getDb} from './../utils/connection'
import type {ProjectType} from './../types/project'

type Create = ({
    name: string,
    categories?: Array<string>
}) => Promise<ProjectType>

const create: Create = (args) => {
    const db = getDb()
    const Project = db.collection("project")
    
    return Project.create(args)
}

export {
    create
}