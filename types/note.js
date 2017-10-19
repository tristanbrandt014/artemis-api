// @flow
export type TodoType = {
    description: string,
    done: boolean
}

export type NoteType = {
    id: string,
    name: string,
    body: string,
    todos: Array<TodoType>
}