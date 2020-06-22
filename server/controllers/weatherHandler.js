const db = require('../database')
const util = require('util')
const { successMsg, errorMsg } = require('../helper/constants')

// promisify mongodb find query
const find = util.promisify(db.weatherData.find).bind(db.weatherData)

// function to check temperature out of range
const checkTempRange = async (req, res) => {
  const { date, time, location, low, high } = req.params
  const dateString = date + ' ' + time + ':00:00'
  try {
    const result = await find({
      name: location,
      dateString,
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
    console.log(error)
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

module.exports = { checkTempRange }
