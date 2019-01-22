import * as express from 'express'
import * as helmet from 'helmet'
import * as cors from 'helmet'
import * as jwt from 'express-jwt'
import { ApolloServer } from 'apollo-server-express'
import { createSchema } from './api/schema'
import { connectToDatabase } from './db/connect'
import { runSeeders } from './db/seeders/runSeeders'
require('dotenv').config()

const {
    RUN_SEEDERS,
    NODE_ENV,
    SECRET_KEY,
} = process.env

const envIsDevelopment = NODE_ENV === 'development'
const shouldRunSeeders = RUN_SEEDERS === 'true'

; (async () => {
    await connectToDatabase()

    if (shouldRunSeeders && envIsDevelopment) {
        await runSeeders()
    }

    const auth = jwt({
        secret: SECRET_KEY,
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
        console.info(`GraphQL is now running on port 5000!`)
    })
})()
