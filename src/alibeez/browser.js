const puppeteer = require('puppeteer')

let browserPromise

const getBrowser = () => {
  if (browserPromise) return browserPromise
  const headless = process.env.CHROME_HEADLESS !== 'false'
  console.info(`starting up browser ${headless ? 'in headless mode' : ''}`)
  return browserPromise = puppeteer.launch({
    headless,
    devtools: true,
    args: [
      '--window-size=2000,1000',
    ],
  })
}

const close = async () => {
  if (!browserPromise) return
  console.info('closing browser')
  const browser = await browserPromise
  await browser.close()
}

module.exports = {
  getBrowser,
  close,
}
