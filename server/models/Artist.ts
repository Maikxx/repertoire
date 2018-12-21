import * as mongoose from 'mongoose'

export const Artist = mongoose.model('Artist', new mongoose.Schema({
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
