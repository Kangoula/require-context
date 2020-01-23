module.exports = function (directory, recursive, regExp) {
  const dir = require('node-dir')
  const path = require('path')
  const callsites = require('callsites')


  // Assume absolute path by default
  let basepath = directory

  if (directory[0] === '.') {
    // Relative path
    const callerFile = callsites()[1].getFileName()
    // fastest method is to use substring: https://stackoverflow.com/a/23963668
    const idx = callerFile.lastIndexOf('/')
    const callerDir = callerFile.substring(0, idx < 0 ? string.length : idx)

    basepath = path.join(callerDir, directory)
  } else if (!path.isAbsolute(directory)) {
    // Module path
    basepath = require.resolve(directory)
  }

  const keys = dir
    .files(basepath, {
      sync: true,
      recursive: recursive || false
    })
    .filter(function (file) {
      return file.match(regExp || /\.(json|js)$/)
    })
    .map(function (file) {
      return path.join('.', file.slice(basepath.length + 1))
    })

  const context = function (key) {
    return require(context.resolve(key))
  }

  context.resolve = function (key) {
    return path.join(basepath, key)
  }

  context.keys = function () {
    return keys
  }

  return context
}
