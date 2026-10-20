const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const ngoRoutes = require('./routes/ngoRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables FIRST
dotenv.config();

console.log('\n🎯 Environment Variables Check (Main File):');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'NOT FOUND');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
    let mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.log('⚠️ MONGO_URI not configured. Initializing embedded in-memory MongoDB...');
        try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
            console.log('✅ In-memory MongoDB running at:', mongoUri);
        } catch (err) {
            console.warn('⚠️ Could not start in-memory MongoDB, attempting localhost fallback:', err.message);
            mongoUri = 'mongodb://127.0.0.1:27017/anonymous_vault';
        }
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB connected');

        // Check if NGO Profiles need initial seeding
        const NGOProfile = require('./models/ngoProfile');
        const count = await NGOProfile.countDocuments();
        if (count === 0) {
            const { dummyNGOProfiles } = require('./seedNGOProfiles');
            await NGOProfile.insertMany(dummyNGOProfiles);
            console.log(`🌱 Auto-seeded ${dummyNGOProfiles.length} default NGO profiles`);
        }
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
    }
};
connectDB();

// Routes
app.use('/api/ngo', ngoRoutes);
app.use('/api/report', reportRoutes);

app.use(errorHandler);

module.exports = app;