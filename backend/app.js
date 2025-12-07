const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const ngoRoutes = require('./routes/ngoRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/ngo', ngoRoutes);
app.use('/api/report', reportRoutes);

app.use(errorHandler);

module.exports = app;
