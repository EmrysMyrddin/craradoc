const fs = require('fs')

module.exports = async ({ page, call, shouldChangePage }) => {
  await call('type', 'input[type="email"]', [process.env.GOOGLE_USERNAME])
  await page.click('#identifierNext')
  await call('type', 'input[type="password"]', [process.env.GOOGLE_PASSWORD], { visible: true })
  await shouldChangePage(async () => {
    await page.click('#passwordNext')
  })

  while (page.url().includes('accounts.google.com')) {
    console.info('waiting 2FA')
    await shouldChangePage()
  }

  const googleCookies = await page.cookies('https://accounts.google.com')
  fs.writeFileSync('cookies.json', JSON.stringify(googleCookies, null, 2))
  console.info('cookies saved')
}
