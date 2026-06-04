const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// 501 handler for unimplemented methods
app.use((req, res, next) => {
  const implementedMethods = ['GET', 'POST', 'PUT', 'DELETE']
  if (!implementedMethods.includes(req.method)) {
    return res.status(501).json({
      success: false,
      status: 501,
      message: `Method ${req.method} not implemented.`
    })
  }
  next()
})

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: 'CDR Backend API is running!',
    version: '1.0.0',
    endpoints: [
      'POST /api/auth/login',
      'POST /api/auth/register',
      'GET  /api/cdr',
      'GET  /api/cdr/analytics',
    ]
  })
})

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/cdr', require('./routes/cdr'))

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Route ${req.method} ${req.url} not found.`
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    status: 500,
    message: 'Internal server error.',
    error: err.message
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})