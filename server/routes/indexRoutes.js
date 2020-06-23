const express = require('express')
const router = express.Router()
const WeatherHandler = require('../controllers/weatherHandler')

router.get('/info/:dateStr/:location/:low/:high', WeatherHandler.checkTempRange)
router.get('/location/:timeInHour/:low/:high', WeatherHandler.getLocation)
router.get('/time/:location/:low/:high', WeatherHandler.getTime)
router.get('/getDateRange/', WeatherHandler.getDateRange)

module.exports = router
