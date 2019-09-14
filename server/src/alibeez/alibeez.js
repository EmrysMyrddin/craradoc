const { getText } = require('./utils')
const login = require('./login')

const makeAlibeezDriver = (page, cookies) => {
  let isLoggedIn = false

  const goTo = async (path) => {
    await page.page.goto(`${process.env.ALIBEEZ_URL}/#!${path}`)

    if (isLoggedIn) return

    if (cookies && cookies.length) await page.page.setCookie(...cookies)

    await page.shouldChangePage(async () => {
      await page.call('click', '.google-button')
    })

    if (page.page.url().includes('accounts.google.com')) await login(page)
    isLoggedIn = true
  }

  const goToTimeSheet = async (month = new Date().getMonth(), year = new Date().getFullYear()) => {
    console.info(`go to timesheet ${year}-${month}`)
    await goTo(`timesheets/${year}-${month}/edit`)
    await page.waitFor('.v-label-status', { visible: true })
  }

  const getProjectLines = () => page.call('$$', '#timesheet-project-table .v-table-body tr')

  const getDayCell = (dayNumber) => (project) => project.$(`td:nth-of-type(${dayNumber + 2})`)

  const getDayCellImputations = (dayCell) => getText(dayCell)

  const getDayCellImputationButton = (dayCell) => dayCell.$('.v-popupview')

  const isImputableDayCell = async (dayCell) => {
    const popupView = await getDayCellImputationButton(dayCell)
    return Boolean(popupView)
  }

  const getProjectName = async (projectLine) => {
    const taskName = await getText(projectLine, 'td:nth-of-type(2)')
    const projectLabel = await getText(projectLine, 'td:nth-of-type(1)')
    return `${taskName} - ${projectLabel}`
  }

  const getProjectsInfos = async (dayNumber) => {
    const lines = await getProjectLines()
    const dayCells = await Promise.all(lines.map(getDayCell(dayNumber)))
    return Promise.all(lines.map(async (line, i) => ({
      imputation: await getDayCellImputations(dayCells[i]),
      imputable: await isImputableDayCell(dayCells[i]),
      name: await getProjectName(line),
    })))
  }

  return { goToTimeSheet, goTo, getProjectsInfos }
}

module.exports = makeAlibeezDriver
