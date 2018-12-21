import * as mongoose from 'mongoose'

export const Song = mongoose.model('Song', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    composers: {
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Composer' }],
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
        required: true,
        type: String,
    },
    publishers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' }],
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
