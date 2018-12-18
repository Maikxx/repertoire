import * as mongoose from 'mongoose'

export const Publisher = mongoose.model('Publisher', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
}))
