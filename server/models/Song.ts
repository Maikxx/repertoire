import * as mongoose from 'mongoose'

export const Song = mongoose.model('Song', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    coverImage: {
        type: String,
    },
    createdAt: {
        required: true,
        type: Date,
    },
    dateOfRecording: {
        required: true,
        type:  Date,
    },
    location: {
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    updatedAt: {
        required: true,
        type: Date,
    },
}))
