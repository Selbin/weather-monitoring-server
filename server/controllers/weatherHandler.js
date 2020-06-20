const db = require('../database')
const util = require('util')
const logger = require('../config/winston')
const { successMsg, errorMsg } = require('../helper/constants')

// promisify mongodb find query
const find = util.promisify(db.weatherData.find).bind(db.weatherData)

// Handler to check temperature out of range
const checkTempRange = async (req, res) => {
  const location = req.params.location
  const low = Number(req.params.low)
  const high = Number(req.params.high)
  const timeStamp = Number(req.params.timeStamp)
  try {
    const result = await find({
      name: location,
      timeStamp,
      $or: [{ temp: { $lt: Number(low) } }, { temp: { $gt: Number(high) } }]
    })
    res
      .status(200)
      .json({
        success: true,
        data: result,
        message: successMsg,
        error: null
      })
  } catch (error) {
    logger.error(req.originalUrl + ' ' + error)
    res
      .status(500)
      .json({
        success: false,
        data: null,
        message: errorMsg,
        error: errorMsg
      })
  }
}

// Handler to get locations outside temperature range
const getLocation = async (req, res) => {
  const low = Number(req.params.low)
  const high = Number(req.params.high)
  const timeInHour = Number(req.params.timeInHour)

  try {
    const result = await find({
      timeInHour,
      $or: [{ temp: { $lt: low } }, { temp: { $gt: high } }]
    })
    res
      .status(200)
      .json({
        success: true,
        data: result,
        message: successMsg,
        error: null
      })
  } catch (error) {
    logger.error(req.originalUrl + ' ' + error)
    res
      .status(500)
      .json({
        success: false,
        data: null,
        message: errorMsg,
        error: errorMsg
      })
  }
}

const getTime = async (req, res) => {
  const low = Number(req.params.low)
  const high = Number(req.params.high)
  const location = req.params.location
  try {
    const result = await find({
      name: location,
      $or: [{ temp: { $lt: low } }, { temp: { $gt: high } }]
    })
    res
      .status(200)
      .json({
        success: true,
        data: result,
        message: successMsg,
        error: null
      })
  } catch (error) {
    logger.error(req.originalUrl + ' ' + error)
    res
      .status(500)
      .json({
        success: false,
        data: null,
        message: errorMsg,
        error: errorMsg
      })
  }
}
module.exports = { checkTempRange, getLocation, getTime }
