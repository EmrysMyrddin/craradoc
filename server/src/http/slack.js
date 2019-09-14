const { createMessageAdapter } = require('@slack/interactive-messages')
const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')

const { SLACK_SIGNING_SECRET, SLACK_TOKEN } = process.env
if (!SLACK_SIGNING_SECRET) {
  console.error('slack signing secreet should be given (SLACK_SIGNING_SECRET)')
  process.emit('SIGINT')
}
if (!SLACK_TOKEN) {
  console.error('slack access token should be given (SLACK_TOKEN)')
  process.emit('SIGINT')
}

createEventAdapter('', {})

const createMiddleware = (adapterFactory) => {
  const adapter = adapterFactory(SLACK_SIGNING_SECRET)
  const requestListener = adapter.requestListener()
  requestListener.adapter = adapter
  return requestListener
}

const interactions = createMiddleware(createMessageAdapter)
const events = createMiddleware(createEventAdapter)

events.adapter.on('error', err => {
  console.error('slack adpater error:', err)
})

const client = new WebClient(SLACK_TOKEN)

module.exports = {
  interactions,
  events,
  client,
}
