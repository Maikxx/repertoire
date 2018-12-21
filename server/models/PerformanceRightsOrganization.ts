import * as mongoose from 'mongoose'

export const PerformanceRightsOrganization = mongoose.model('PerformanceRightsOrganization', new mongoose.Schema({
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
}))
