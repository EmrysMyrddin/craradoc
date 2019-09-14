require('dotenv/config')
const worker = require('./alibeez/worker.js')
const app = require('./http/app')
const browser = require('./alibeez/browser')
const bot = require('./bot')
const { allSettled } = require('./utils/promises')

const start = async () => {
  // worker().catch(err => console.error(err.stack))
  await app.listen()
  await bot.listen()
}

const interrupt = async (signal) => {
  console.info(`caught ${signal} signal. Cleaning up...`)
  const results = await allSettled([
    browser.close(),
  ])
  const errors = results.filter(({ status }) => status === 'rejected')
  if (errors.length) {
    errors.forEach(({ reason }) => console.error('failed to clean up:', reason.stack))
    process.exit(1)
  }
  process.exit(0)
}

['SIGUSR1', 'SIGUSR2', 'SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, interrupt))

start()
