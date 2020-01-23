const callsites = require('callsites')

const getCallerDirectory = () => {
  const fileName = callsites()[0].getFileName()
  // fastest method is to use substring: https://stackoverflow.com/a/23963668
  const idx = callerFile.lastIndexOf('/')
  const callerDir = callerFile.substring(0, idx < 0 ? string.length : idx)

  return callerDir
}

module.exports = {
  getCallerDirectory
}