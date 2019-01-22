import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import { CreateCountry } from '../../domains/Country/CreateCountryService'
require('dotenv').config()
import fetch from 'node-fetch'

const { NODE_ENV } = process.env

export const seedCountries = async () => {
    console.info('Seeding countries...')

    if (NODE_ENV === 'development') {
        const readFile = promisify(fs.readFile)
        const data = await readFile(path.resolve(__dirname, '../data/countries.json'), 'utf8')
        const countries = JSON.parse(data)
        await Promise.all(countries.map(country => CreateCountry({ country })))
    } else {
        const response = await fetch('https://api.jsonbin.io/b/5c47170e6dbfe317d4c1c923')
        const countries = await response.json()
        await Promise.all(countries.map(country => CreateCountry({ country })))
    }

    console.info(`Finished seeding countries`)
}
