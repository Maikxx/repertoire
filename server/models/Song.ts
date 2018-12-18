import * as mongoose from 'mongoose'

export const Song = mongoose.model('Song', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
}))
