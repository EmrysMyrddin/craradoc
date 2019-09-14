const allSettled = (promises) => Promise.all(promises.map(async promise => {
  try {
    return { status: 'resolved', value: await promise }
  } catch (err) {
    return { status: 'rejected', reason: err }
  }
}))

module.exports = {
  allSettled,
}
