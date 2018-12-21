import * as mongoose from 'mongoose'

export const Publisher = mongoose.model('Publisher', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        required: true,
        type: Date,
    },
    name: {
        required: true,
        type: String,
    },
    updatedAt: {
        required: true,
        type: Date,
    },
    role: {
        required: true,
        type: String,
    },
}))
