import * as mongoose from 'mongoose'

export const User = mongoose.model('User', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        required: true,
        type: Date,
    },
    email: {
        required: true,
        type: String,
    },
    isAdmin: {
        default: false,
        type: Boolean,
    },
    isArtist: {
        default: false,
        type: Boolean,
    },
    isPublisher: {
        default: false,
        type: Boolean,
    },
    name: {
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    profileImage: {
        type: String,
    },
    updatedAt: {
        required: true,
        type: Date,
    },
}))
