import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'csv-parser'
import { removeFalsy } from '../utils/Object.prototype'

export const seedRBMH = () => {
    const results = []

    fs.createReadStream(path.resolve(__dirname, '../data/rbmh.csv'))
        .pipe(csv())
        .on('data', d => results.push(removeFalsy(d)))
        .on('end', () => {
            console.log(results)
        })

}
