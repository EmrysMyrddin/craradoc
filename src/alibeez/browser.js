const puppeteer = require('puppeteer')

let browserPromise

const getBrowser = () => {
  if (browserPromise) return browserPromise
  return browserPromise = puppeteer.launch({
    headless: false,
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
