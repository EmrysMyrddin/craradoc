const slack = require('../http/slack')

const userStates = {}

const getState = async user => {
  const state = userStates[user]
  if (state) return state

  const { user: { profile: { email } } } = await slack.client.users.info({ user })
  return userStates[user] = { id: user, email }
}

const listen = () => new Promise((resolve) => {
  slack.events.adapter.on('message', async (message) => {
    const state = await getState(message.user)
    console.log(userStates)
  })

  console.info('bot listening for interactions')
  resolve()
})

module.exports = {
  listen,
}
