import mongoose, { Schema } from 'mongoose';
import { ElectionModel } from '../utils/types.util';

const electionSchema = new Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    electionId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    voters: [{
        type: Number,
        required: true
    }],
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    votedUsers: [{
        type: Number,
        default: []
    }],
    showResults: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: Date,
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Election = mongoose.model<ElectionModel>('Election', electionSchema);