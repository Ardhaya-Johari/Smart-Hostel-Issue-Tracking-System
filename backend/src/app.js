const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/issues', require('./routes/issueRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/lost-and-found', require('./routes/lostAndFoundRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

app.use(errorHandler);

module.exports = { app, prisma };