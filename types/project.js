// @flow

export type ProjectType = {
    id: string,
    name: string,
    description: string,
    status: "ACTIVE" | "SCHEDULED" | "COMPLETE" | "ABANDONED",
    archived: boolean
}