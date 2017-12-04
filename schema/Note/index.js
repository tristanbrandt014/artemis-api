// @flow
import { Mutation } from "./mutations"
import { Query } from "./queries"
import * as types from "./types"

export const mutations = Mutation
export const queries = Query
export { types }

export default {
  mutations,
  queries,
  types
}
