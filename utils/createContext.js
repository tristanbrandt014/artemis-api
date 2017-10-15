import * as handlers from "./../handlers"

export default (token) => {
  return {
    handlers,
    id: token.id
  }
}
