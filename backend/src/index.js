// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./db');
// const developerRoutes = require('./routes/developerRoutes');
// const authRoutes = require('./routes/authRoutes');
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to database
// connectDB();

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get('/', (req, res) => {
//   res.json({ 
//     message: '🚀 Developer Directory API',
//     status: 'running',
//     endpoints: {
//       developers: '/api/developers'
//     }
//   });
// });


// app.use('/api/auth', authRoutes);
// app.use('/api/developers', developerRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });





require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const developerRoutes = require('./routes/developerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Developer Directory API v2.0',
    status: 'running',
    version: '2.0.0',
    features: [
      'Authentication with JWT',
      'Protected CRUD operations',
      'Advanced search & filters',
      'Sorting & pagination',
      'Developer profiles'
    ],
    endpoints: {
      auth: '/api/auth',
      developers: '/api/developers',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/developers', developerRoutes);

// 404 handler// API routes
app.use('/api/auth', authRoutes);
app.use('/api/developers', developerRoutes);

// Error handler FIRST
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// 404 LAST
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});



app.listen(PORT, () => {
  console.log('=========================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔐 Authentication enabled`);
  console.log(`📊 Database: MongoDB`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('=========================================');
});
