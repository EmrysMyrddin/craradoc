const express = require('express')
const bodyParser = require('body-parser')
const slack = require('./slack')

const app = express()

app.use('/slack/events', slack.events)
app.use('/slack/actions', slack.interactions)

app.use(bodyParser.json())

const listen = () => new Promise((resolve) => {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.info(`listening for slack events on ${port}`)
    resolve()
  })
})

module.exports = {
  app, listen,
}
