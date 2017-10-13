// @flow
import {getDb} from './../utils/connection'
import type {ProjectType} from './../types/project'

type CreateType = ({
    name: string,
    categories?: Array<string>
}) => Promise<ProjectType>

const create: CreateType = async (args) => {
    const db = await getDb()
    const Project = db.collection("project")

    const result = await Project.insert({
        ...args,
        description: "",
        status: "NONE",
        archived: false
    })
    return result.ops[0]
}

export default {
    create
}