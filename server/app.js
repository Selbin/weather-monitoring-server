const express = require('express')
const dotEnv = require('dotenv')
const indexRoutes = require('./routes/indexRoutes')
const cronJob = require('./gateway/weatherGateway')

dotEnv.config()

cronJob()

const app = express()

app.use('/weather', indexRoutes)

app.listen(process.env.APP_PORT, () => console.log('listening to: ', process.env.APP_PORT))
