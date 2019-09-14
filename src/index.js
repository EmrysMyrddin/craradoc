require('dotenv/config')
const worker = require('./alibeez/worker.js')
const app = require('./http/app')
const browser = require('./alibeez/browser')
const { allSettled } = require('./utils/promises')

// worker().catch(err => console.error(err.stack))
app.listen()

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
