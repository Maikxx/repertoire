import * as mongoose from 'mongoose'

export const Artist = mongoose.model('Artist', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
}))
