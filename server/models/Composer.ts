import * as mongoose from 'mongoose'

export const Composer = mongoose.model('Composer', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        required: true,
        type: Date,
    },
    updatedAt: {
        required: true,
        type: Date,
    },
    user: {
        ref: 'User',
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
}))
