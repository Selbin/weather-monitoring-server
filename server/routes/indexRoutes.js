const express = require('express')
const router = express.Router()
const WeatherHandler = require('../controllers/weatherHandler')

router.get('/info/:timeStamp/:location/:low/:high', WeatherHandler.checkTempRange)
router.get('/location/:timeInHour/:low/:high', WeatherHandler.getLocation)
router.get('/time/:location/:low/:high', WeatherHandler.getTime)

module.exports = router
