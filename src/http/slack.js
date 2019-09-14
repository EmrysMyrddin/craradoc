const { createMessageAdapter } = require('@slack/interactive-messages')
const { createEventAdapter } = require('@slack/events-api')

if (!process.env.SLACK_SIGNING_SECRET) {
  console.error('slack signing secreet should be given (SLACK_SIGNING_SECRET)')
  process.emit('SIGINT')
}


const createMiddleware = (adapterFactory) => {
  const adapter = adapterFactory(process.env.SLACK_SIGNING_SECRET)
  const requestListener = adapter.requestListener()

  const middleware = ctx => requestListener(ctx.req, ctx.res)

  middleware.adapter = adapter
  return middleware
}

const interactionsMiddleware = createMiddleware(createMessageAdapter)
const eventsMiddleware = createMiddleware(createEventAdapter)

eventsMiddleware.adapter.on('error', err => {
  console.error('slack adpater error:', err)
})

module.exports = {
  interactionsMiddleware,
  eventsMiddleware,
}
