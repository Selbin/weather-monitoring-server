const dotEnv = require('dotenv')
const mongojs = require('mongojs')

dotEnv.config()

const db = mongojs(process.env.DB_CONN, [process.env.COLLECTIONS])

db.on('error', function (err) {
  console.log('database error', err)
})

db.on('connect', function () {
  console.log('database connected')
})

module.exports = db
