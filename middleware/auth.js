// @flow

import type { $Request, $Response, NextFunction } from "express"
import config from "./../config.js"
import jwt from "jsonwebtoken"
import createContext from "./../utils/createContext"

export const AuthMiddleware = async function(
  req: $Request,
  res: $Response,
  next: NextFunction
) {
  // check header or url parameters or post parameters for token
  const token =
    req.body.token || req.query.token || req.headers["authorization"]
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) {
        res.sendStatus(401)
      } else {
        // if everything is good, create the context
        const context = await createContext(decoded)
        req.context = context
        next()
      }
    })
  } else {
    res.sendStatus(401)
    return
  }
}
