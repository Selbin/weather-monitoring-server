const request = require('supertest')
const expect = require('expect')
const app = require('../app')
/* const test1 = {
  success: true,
  data: [
    {
      _id: '5eee55a9408ac2756908fea8',
      name: 'Thrissur',
      lat: 10.5167,
      long: 76.2167,
      id: 1254187,
      timeStamp: 1593151200000,
      timeInHour: 6,
      dateString: '2020-06-26 06:00:00',
      temp: 23.52
    }
  ],
  message: 'Fetch Sucessful',
  error: null
} */

describe('GET weather/info/:timeStamp/:location/:low/:high', () => {
  it('responds with json containing weather data', done => {
    request(app)
      .get('/weather/info/1593151200000/Thrissur/24/25')
      .expect(200)
      .expect(res => {
        // console.log(res.body)
        // expect(res.body).toEqual(test1)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})

describe('GET weather/location/:timeInHour/:low/:high', () => {
  it('responds with json containing weather data', done => {
    request(app)
      .get('/weather/location/9/23/26')
      .expect(200)
      .expect(res => {
        expect(res.body.success).toBe(true)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})

describe('GET weather/time/:location/:low/:high', () => {
  it('responds with json containing weather data', done => {
    request(app)
      .get('/weather/time/Thrissur/23/26')
      .expect(200)
      .expect(res => {
        expect(res.body.success).toBe(true)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})
