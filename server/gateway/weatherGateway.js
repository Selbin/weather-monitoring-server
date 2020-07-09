const axios = require('axios')
const cron = require('node-cron')
const db = require('../database/database')
const dotEnv = require('dotenv')
const logger = require('../config/winston')
const { apiUrl } = require('../helper/constants')
let endDate = 0
let temp = 0
dotEnv.config()

/**
 * @description fetch weather data using open-weather-map api
 * @param {string} city
 */

const getWeatherData = async city => {
  try {
    const response = await axios.get(apiUrl(city))
    return response
  } catch (error) {
    logger.error('weather api call\r\n' + error)
  }
}

module.exports = () => {
  // cron job scheduled to fetch data from weather api at 12 am
  cron.schedule('0 0 0 * * *', () => {
    const cities = JSON.parse(process.env.CITY)
    cities.forEach(async (city, i) => {
      let result = {}
      const response = await getWeatherData(city)
      response.data.list.forEach((data) => {
        if (data.dt > endDate) {
          result = {
            name: response.data.city.name,
            lat: response.data.city.coord.lat,
            long: response.data.city.coord.lon,
            id: response.data.city.id,
            timeStamp: Number(data.dt + '000'),
            timeInHour: new Date(Number(data.dt + '000')).getUTCHours(),
            dateString: data.dt_txt,
            temp: data.main.temp
          }
          db.weatherData.insert(result)
        }
      })
      if (i === (cities.length) - 1) temp = response.data.list[(response.data.list.length) - 1].dt
    })
    endDate = temp
  })
}
