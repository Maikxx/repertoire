import * as mongoose from 'mongoose'

export const User = mongoose.model('User', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
}))
