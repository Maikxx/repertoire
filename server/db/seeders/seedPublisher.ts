import { CreatePublisher } from '../../domains/Publisher/CreatePublisherService'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

export const seedPublishers = async (): Promise<void> => {
    const data = await readFile(path.resolve(__dirname, '../data/publishers.json'), 'utf8')
    const publishers = JSON.parse(data)

    await Promise.all(publishers.map(publisher => CreatePublisher({ publisher })))
}
