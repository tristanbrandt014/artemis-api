// @flow

export type ProjectType = {
    id: string,
    name: string,
    description: string,
    status: "ACTIVE" | "TODO" | "COMPLETE" | "ABANDONED",
    archived: boolean
}