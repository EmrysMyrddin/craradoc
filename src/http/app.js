const express = require('express')
const bodyParser = require('body-parser')
const slack = require('./slack')

const app = express()

app.use('/slack/events', slack.eventsMiddleware)
app.use('/slack/interactions', slack.interactionsMiddleware)

app.use(bodyParser.json())

const listen = () => {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.info(`listening for slack events on ${port}`)
  })
}

module.exports = {
  app, listen,
}
