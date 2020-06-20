const express = require('express')
const router = express.Router()
const WeatherHandler = require('../controllers/weatherHandler')

router.get('/info/:date/:time/:location/:low/:high', WeatherHandler.checkTempRange)
router.get('/location/:startTime/:endTime/:low/:high', WeatherHandler.getLocation)
router.get('/time/:location/:low/:high', WeatherHandler.getTime)

module.exports = router
