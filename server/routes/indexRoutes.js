const express = require('express')
const router = express.Router()
const WeatherHandler = require('../controllers/weatherHandler')
router.get('/info/:date/:time/:location/:low/:high', WeatherHandler.checkTempRange)

module.exports = router
