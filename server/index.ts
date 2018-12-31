import * as express from 'express'
import * as helmet from 'helmet'
import * as cors from 'helmet'
import * as jwt from 'express-jwt'
require('dotenv').load()
import { ApolloServer } from 'apollo-server-express'
import { createSchema } from './api/schema'
import { connectToDatabase } from './db/connect'
import { runSeeders } from './db/seeders/runSeeders'
import { spawn } from 'child_process'

; (async () => {
    await connectToDatabase()

    if (process.env.RUN_SEEDERS === 'true') {
        await runSeeders()
    }

    const auth = jwt({
        secret: process.env.SECRET_KEY,
        credentialsRequired: false,
    })

    const app = express()
    app.use(helmet())
    app.use(cors())
    app.use(auth)

    const server = new ApolloServer({
        schema: createSchema(),
        context: ({ req }) => ({ user: req.user }),
    })
    server.applyMiddleware({ app })

    app.listen(({ port: 5000 }), () => {
        console.info(`GraphQL is now running on http://localhost:5000${server.graphqlPath}`)
    })

    if (process.env.NODE !== 'production') {
        app.on('sigterm', () => {
            spawn('sh', ['./db/stop_db.sh'])
        })
    }
})()
