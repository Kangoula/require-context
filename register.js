var wrap = module.constructor.wrap
var requireContext = require('./src')

module.constructor.wrap = function (script) {
  return wrap('require.context = ' + requireContext.toString() + '\n' + script)
}
