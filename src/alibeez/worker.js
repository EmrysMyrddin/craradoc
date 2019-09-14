const fs = require('fs')
const { newPage } = require('./utils')
const makeAlibeezDriver = require('./alibeez')

const loadCookies = () => {
  try {
    const cookiesFile = fs.readFileSync('cookies.json')
    return JSON.parse(cookiesFile)
  } catch (err) {
    console.warn('error while loading cookies:', err.stack)
    return null
  }
}

module.exports = async () => {
  const page = await newPage()
  const alibeez = makeAlibeezDriver(page, loadCookies())

  const now = new Date()

  await alibeez.goToTimeSheet(process.MONTH, process.YEAR)

  console.log(await alibeez.getProjectsInfos(Number(process.env.DAY) || now.getDate()))
}
