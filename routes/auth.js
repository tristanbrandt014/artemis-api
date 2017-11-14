// @flow
import { Router } from "express"
import type { $Request, $Response } from "express"
import { getDb } from "./../utils/connection"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "./../config"
import { omit } from "lodash"

export const SALT_WORK_FACTOR = 10
export const Auth = Router()

Auth.post("/register", async (req: $Request, res: $Response) => {
  if (
    !(
      req.body.firstname &&
      req.body.lastname &&
      req.body.email &&
      req.body.password
    )
  ) {
    res.sendStatus(400)
    return
  }
  const db = await getDb()
  const User = db.collection("user")

  const query = await User.find({
    email: req.body.email
  })
  const result = await query.toArray()
  if (result.length) {
    res.status(403).send("email exists")
    return
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  const password = await bcrypt.hash(req.body.password, salt)

  const { firstname, lastname, email } = req.body

  const insert = await User.insert({
    firstname,
    lastname,
    email,
    password
  })

  const user = insert.ops[0]
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: "1d" // expires in 24 hours
  })

  res.send({
    token,
    user: {
      ...omit(user, ["_id", "password"]),
      id: user._id
    }
  })
})

Auth.post("/login", async (req: $Request, res: $Request) => {
  if (!(req.body.email && req.body.password)) {
    res.sendStatus(400)
    return
  }

  const db = await getDb()
  const User = db.collection("user")

  const query = await User.find({
    email: req.body.email
  })
  const result = await query.toArray()

  if (!result.length) {
    res.sendStatus(403)
    return
  }
  const user = result[0]
  const match = await bcrypt.compare(req.body.password, user.password)

  if (!match) {
    res.sendStatus(403)
    return
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: "1d" // expires in 24 hours
  })

  res.send({
    token,
    user: {
      ...omit(user, ["_id", "password"]),
      id: user._id
    }
  })
})
