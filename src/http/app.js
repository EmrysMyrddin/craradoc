const Koa = require('koa')
const route = require('koa-route')
const slack = require('./slack')

const app = new Koa()
app.use(route.all('/slack/interactions', slack.interactionsMiddleware))
app.use(route.all('/slack/events', slack.eventsMiddleware))

const listen = () => {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.info(`http server listening on port ${port}`)
  })

  app.on('error', (err, ctx) => {
    if (ctx) console.error('internal server error during request: ', err, ctx)
    else console.error('internal server error:', err)
  })
}

module.exports = { app, listen }
