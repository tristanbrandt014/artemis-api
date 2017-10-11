// @flow
import test from "./schema"
import { connect, getDb } from "./utils/connection"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from "./config"
import express from "express"
import schema from "./schema"
import createContext from "./utils/createContext"

const server = express()
connect()

server.set('auth_secret', config.secret)
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(morgan('dev'))
server.use(cors())

getDb()
  .then(() => {
    server.use(
      "/graphql",
      graphqlExpress(() => ({
        schema,
        context: createContext()
      }))
    )

    server.use(
      "/graphiql",
      graphiqlExpress({
        endpointURL: "/graphql"
      })
    )
    server.listen(config.port, () =>
      console.log(`Listening at port ${config.port}`)
    )
  })
  .catch(err => console.log(err))
