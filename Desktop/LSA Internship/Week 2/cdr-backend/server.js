const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/cdr', require('./routes/cdr'))

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CDR Backend API is running!' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})