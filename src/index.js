require('dotenv/config')
const worker = require('./alibeez/worker.js')
const slack = require('./http/slack')
const browser = require('./alibeez/browser')
const { allSettled } = require('./utils/promises')

worker().catch(err => console.error(err.stack))
slack.listen()

const interrupt = async (signal) => {
  console.info(`caught ${signal} signal. Cleaning up...`)
  const results = await allSettled([
    slack.stop(),
    browser.close(),
  ])
  results.forEach(({ status, reason }) => {
    if (status === 'rejected') console.error('failed to clean up:', reason.stack)
  })
}

['SIGUSR1', 'SIGUSR2', 'SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, interrupt))
