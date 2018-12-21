import * as mongoose from 'mongoose'

export const Distributor = mongoose.model('Distributor', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        required: true,
        type: Date,
    },
    name: {
        type: String,
    },
    updatedAt: {
        required: true,
        type: Date,
    },
}))
