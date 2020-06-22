const dotEnv = require('dotenv')

dotEnv.config()

module.exports = {
  successMsg: 'Fetch Sucessful',
  errorMsg: 'Unable to fetch data, Please try again later',
  apiUrl: (city) => `http://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${process.env.API_KEY}&units=${process.env.TEMP_UNIT}`,
  setResponseObj: (success, data, message, error) => {
    return { success, data, message, error }
  }
}
