import * as mongoose from 'mongoose'

export const User = mongoose.model('User', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
}))
