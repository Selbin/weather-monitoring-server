const express = require('express')
const dotEnv = require('dotenv')
const indexRoutes = require('./routes/indexRoutes')
const cronJob = require('./gateway/weatherGateway')
const winston = require('./config/winston')
const morgan = require('morgan')
const cors = require('cors')

dotEnv.config()

const app = express()

app.use(morgan('combined', { stream: winston.stream }))

cronJob()

app.use(cors())
app.use('/weather', indexRoutes)

app.listen(process.env.APP_PORT, () => console.log('listening to: ', process.env.APP_PORT))

module.exports = app
