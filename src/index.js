const requireContext = (directory, recursive, regExp) => {
  const dir = require('node-dir')
  const path = require('path')
  const utils = require('./utils')

  // Assume absolute path by default
  const basepath = directory

  if (directory[0] === '.') {
    // Relative path
    basepath = path.join(utils.getCallerDirectory(), directory)
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
    return path.join(directory, key)
  }

  context.keys = function () {
    return keys
  }

  return context
}

module.exports = requireContext
