const { createMessageAdapter } = require('@slack/interactive-messages')

if (!process.env.SLACK_SIGNING_SECRET) {
  console.error('slack signing secreet should be given (SLACK_SIGNING_SECRET)')
  process.emit('SIGINT')
}

const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)

const listen = async () => {
  const port = process.env.PORT || 4000
  slackInteractions.start(port)
  console.info(`slack interactions listening on port ${port}`)
}

const stop = async () => {
  console.info('stopping slack interactions')
  await slackInteractions.stop()
}

module.exports = {
  listen,
  stop,
}
