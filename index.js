// @flow
import { connect } from "./utils/connection"
import { graphqlExpress } from "apollo-server-express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import config from "./config"
import express from "express"
import schema from "./schema"
import env from "dotenv"
import { Auth } from "./routes"
import {AuthMiddleware} from './middleware'

const server = express()
env.config()

server.set("auth_secret", config.secret)
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(morgan("dev"))
server.use(cors())

connect()
  .then(() => {
    server.use(Auth)
    server.use(AuthMiddleware)

    server.use(
      "/graphql",
      graphqlExpress(req => ({
        schema,
        context: req.context
      }))
    )

    server.listen(config.port, () =>
      console.log(`Listening at port ${config.port}`)
    )
  })
  .catch(err => console.log(err))
