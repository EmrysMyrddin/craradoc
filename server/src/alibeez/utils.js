const { getBrowser } = require('./browser')

const makeUtils = page => {
  const call = async (action, selector, actionArgs = [], waitArgs = {}) => {
    await page.waitForSelector(selector, { timeout: 3000, ...waitArgs })
    return page[action](selector, ...actionArgs)
  }

  const shouldChangePage = async (task = _ => _) => {
    const navigationPromise = page.waitForNavigation()
    const result = await task()
    await navigationPromise
    return result
  }

  const waitFor = (selector, options) => page.waitForSelector(
    selector,
    { timeout: 30000, ...options },
  )

  return { call, shouldChangePage, waitFor }
}

const newPage = async () => {
  const browser = await getBrowser()
  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()
  page.close = context.close
  await page.setViewport({ width: 1280, height: 1000 })

  const utils = makeUtils(page)

  return { page, ...utils }
}

const getText = (element, selector) => {
  if (selector) return element.$eval(selector, node => node.textContent)
  return element.evaluate(node => node.textContent)
}

module.exports = {
  newPage,
  getText,
}
