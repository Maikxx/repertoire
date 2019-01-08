import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import { CreateCountry } from '../../domains/Country/CreateCountryService'

const readFile = promisify(fs.readFile)

export const seedCountries = async () => {
    const data = await readFile(path.resolve(__dirname, '../data/countries.json'), 'utf8')
    const countries = JSON.parse(data)

    await Promise.all(countries.map(country => CreateCountry({ country })))
}