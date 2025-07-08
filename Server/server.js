const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoutes');
const journalRoutes = require('./src/routes/journalRoutes');

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://globe-snap.vercel.app',
    credentials: true                
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/journals', journalRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))

app.listen(5000,() => {
  console.log("Server running")
})