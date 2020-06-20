const axios = require('axios')
const cron = require('node-cron')
const db = require('../database')
const dotEnv = require('dotenv')
let endDate = 0
dotEnv.config()

/**
 * @description fetch weather data using open-weather-map api
 * @param {string} city
 */

const getWeatherData = async city => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${process.env.API_KEY}&units=${process.env.TEMP_UNIT}`
  try {
    const response = await axios.get(url)
    return response
  } catch (error) {
    console.error(error)
  }
}

module.exports = () => {
  cron.schedule('0 0 0 * * *', () => {
    const cities = JSON.parse(process.env.CITY)
    cities.forEach(async city => {
      let result = {}
      const response = await getWeatherData(city)
      response.data.list.forEach((data, i) => {
        if (data.dt > endDate) {
          result = {
            name: response.data.city.name,
            lat: response.data.city.coord.lat,
            long: response.data.city.coord.lon,
            id: response.data.city.id,
            time: data.dt,
            dateString: data.dt_txt,
            temp: data.main.temp
          }
          db.weatherData.insert(result)
        }
      })
      endDate = response.data.list[response.data.list.length].dt
    })
  })
}
