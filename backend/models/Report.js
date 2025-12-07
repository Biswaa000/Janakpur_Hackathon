// models/Report.js - UPDATED VERSION
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    // Encrypted fields - make them optional with defaults
    encryptedIncidentTitle: { 
        type: String, 
        required: [true, 'Incident title is required'],
        validate: {
            validator: function(v) {
                return v && v.trim().length > 0;
            },
            message: 'Encrypted incident title cannot be empty'
        }
    },
    encryptedDescription: { 
        type: String, 
        required: [true, 'Description is required'],
        validate: {
            validator: function(v) {
                return v && v.trim().length > 0;
            },
            message: 'Encrypted description cannot be empty'
        }
    },
    encryptedLocation: { 
        type: String, 
        required: [true, 'Location is required'],
        validate: {
            validator: function(v) {
                return v && v.trim().length > 0;
            },
            message: 'Encrypted location cannot be empty'
        }
    },
    encryptedDateTime: { 
        type: String, 
        required: [true, 'Date and time are required'],
        validate: {
            validator: function(v) {
                return v && v.trim().length > 0;
            },
            message: 'Encrypted date/time cannot be empty'
        }
    },
    encryptedPhoneNumber: { 
        type: String, 
        default: ''  
    },
    encryptedEvidenceUrls: { 
        type: [String], 
        default: [] 
    },
    
    // Non-encrypted fields
    consentToShareWithNGO: { 
        type: Boolean, 
        default: false 
    },
    incidentType: { 
        type: String, 
        default: 'General' 
    },
    urgencyLevel: { 
        type: String, 
        default: 'Normal' 
    },
    reportId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    
    // Additional fields for NGO management
    status: { 
        type: String, 
        enum: ['pending', 'under_review', 'action_taken', 'resolved', 'archived'],
        default: 'pending'
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'NGO',
        default: null
    },
    notes: { 
        type: String, 
        default: '' 
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO',
        default: null
    }
});

// Add indexes for better query performance - REMOVE DUPLICATES
// Remove line: reportSchema.index({ reportId: 1 }); // Duplicate of unique: true
reportSchema.index({ consentToShareWithNGO: 1, createdAt: -1 });
reportSchema.index({ incidentType: 1, urgencyLevel: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ isDeleted: 1 });

// FIXED pre-save middleware using arrow function
reportSchema.pre('save', function(next) {
    // Check if next is a function (safety check)
    if (typeof next === 'function') {
        this.updatedAt = Date.now();
        next();
    } else {
        // If next is not a function, just update and continue
        this.updatedAt = Date.now();
    }
});


module.exports = mongoose.model('Report', reportSchema);