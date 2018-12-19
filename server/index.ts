import * as express from 'express'
import * as helmet from 'helmet'
import * as cors from 'helmet'
import { ApolloServer } from 'apollo-server-express'
import { createSchema } from './api/schema'
import { connectToMongoAtlas } from './db/connect'
import * as jwt from 'express-jwt'

if (process.env.NODE !== 'production') {
    require('dotenv').load()
}

connectToMongoAtlas()

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
