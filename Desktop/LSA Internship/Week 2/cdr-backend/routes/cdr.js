const express = require('express')
const router = express.Router()
const cdrData = require('../data/cdrData')
const { verifyToken } = require('../middleware/auth')

// GET /api/cdr - Get all CDR records with pagination and filtering
router.get('/', verifyToken, (req, res) => {
  try {
    let records = [...cdrData]

    // Filter by city
    if (req.query.city) {
      records = records.filter(r =>
        r.city.toLowerCase().includes(req.query.city.toLowerCase())
      )
    }

    // Filter by caller number
    if (req.query.caller) {
      records = records.filter(r =>
        r.callerNumber.includes(req.query.caller)
      )
    }
    // Filter by receiver number
    if (req.query.receiver) {
      records = records.filter(r =>
        r.receiverNumber.includes(req.query.receiver)
      )
    }
    

    // Filter by date range
    if (req.query.startDate) {
      records = records.filter(r =>
        new Date(r.callStartTime) >= new Date(req.query.startDate)
      )
    }

    if (req.query.endDate) {
      records = records.filter(r =>
        new Date(r.callStartTime) <= new Date(req.query.endDate)
      )
    }

    // Pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const paginated = records.slice(startIndex, endIndex)

    res.json({
      total: records.length,
      page,
      limit,
      totalPages: Math.ceil(records.length / limit),
      data: paginated
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// GET /api/cdr/analytics - Get analytics
router.get('/analytics', verifyToken, (req, res) => {
  try {
    const total = cdrData.length
    const totalDuration = cdrData.reduce((sum, r) => sum + r.callDuration, 0)
    const totalCost = cdrData.reduce((sum, r) => sum + parseFloat(r.callCost), 0)
    const successful = cdrData.filter(r => r.callStatus === true).length
    const failed = cdrData.filter(r => r.callStatus === false).length
    const inbound = cdrData.filter(r => r.callDirection === true).length
    const outbound = cdrData.filter(r => r.callDirection === false).length

    // Top callers
    const callerMap = {}
    cdrData.forEach(r => {
      callerMap[r.callerName] = (callerMap[r.callerName] || 0) + 1
    })
    const topCallers = Object.entries(callerMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, calls]) => ({ name, calls }))

    res.json({
      total,
      totalDuration,
      totalCost: parseFloat(totalCost.toFixed(2)),
      successful,
      failed,
      inbound,
      outbound,
      avgDuration: parseFloat((totalDuration / total).toFixed(2)),
      topCallers
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error.' })
  }
})

module.exports = router