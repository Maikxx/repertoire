import * as mongoose from 'mongoose'

export const Distributor = mongoose.model('Distributor', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
}))
