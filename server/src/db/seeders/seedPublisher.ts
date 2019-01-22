import { CreatePublisher } from '../../domains/Publisher/CreatePublisherService'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import fetch from 'node-fetch'
require('dotenv').config()
const { NODE_ENV } = process.env

export const seedPublishers = async () => {
    console.info('Seeding publishers...')

    if (NODE_ENV === 'development') {
        const readFile = promisify(fs.readFile)
        const data = await readFile(path.resolve(__dirname, '../data/publishers.json'), 'utf8')
        const publishers = JSON.parse(data)

        await Promise.all(publishers.map(publisher => CreatePublisher({ publisher })))
    } else {
        const response = await fetch('https://api.jsonbin.io/b/5c4719f104ce8017ee2808df')
        const publishers = await response.json()
        await Promise.all(publishers.map(publisher => CreatePublisher({ publisher })))
    }

    console.info(`Finished seeding publishers`)
}
