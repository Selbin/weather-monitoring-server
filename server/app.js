const express = require('express')
const cron = require('node-cron')
const axios = require('axios')
const dotEnv = require('dotenv')

dotEnv.config()

const cities = JSON.parse(process.env.CITY)

const downloadData = async city => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${process.env.API_KEY}`
  console.log(url)
  try {
    const response = await axios.get(url)
    return response
  } catch (error) {
    console.error(error)
  }
}
const combined = []

cron.schedule('**0***', () => {
  cities.forEach(async city => {
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
    combined.push(result)
    console.log(combined)
  })
})
