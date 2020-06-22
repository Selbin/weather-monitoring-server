const dotEnv = require('dotenv')

dotEnv.config()

module.exports = {
  successMsg: 'Fetch Sucessful',
  errorMsg: 'Unable to fetch data, Please try again later'
}
