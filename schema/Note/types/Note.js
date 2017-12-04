// @flow
import { get } from "lodash"
import gql from "./../../../utils/gql"

export const Note = gql`
  type Note {
    id: String
    name: String
    body: String
    todos: [Todo]
    project: Project
  }
`

Note.id = root => {
  return root._id
}

Note.project = async (root, params, context) => {
  if (root.project) {
    console.log('ROOT', root.project)
    return root.project
  }
  const project = await context.handlers.Project.fetch(context.id)({
    note_id: root._id
  })

  console.log('OTHER', project)
  return get(project, "[0]", [])
}
