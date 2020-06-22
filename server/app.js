const express = require('express')
const cron = require('node-cron')
const axios = require('axios')
const dotEnv = require('dotenv')
const db = require('./model/store')
dotEnv.config()

const app = express()
const cities = JSON.parse(process.env.CITY)

const downloadData = async city => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${process.env.API_KEY}`
  try {
    const response = await axios.get(url)
    return response
  } catch (error) {
    console.error(error)
  }
}

cron.schedule('0 0 0 * * *', async () => {
  await cities.forEach(async city => {
    const result = {}
    const response = await downloadData(city)
    result.name = response.data.city.name
    result.lat = response.data.city.coord.lat
    result.lon = response.data.city.coord.lon
    result.id = response.data.city.id
    result.data = []
    response.data.list.forEach((data) => {
      result.data.push({ time: data.dt, dateString: data.dt_txt, temp: data.main.temp })
    })
    console.log(result)
    db.data.insert(result)
  })
})

app.listen(process.env.APP_PORT, () => console.log('listening to: ', process.env.APP_PORT))
