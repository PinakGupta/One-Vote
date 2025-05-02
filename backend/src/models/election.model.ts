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
        type: String,
        default: []
    }],
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        default: []
    }],
    votedUsers: [{
        type: String,
        default: []
    }],
    showResults: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Election = mongoose.model<ElectionModel>('Election', electionSchema);