'use strict'

module.exports = function ($void) {
  // In spite of $void.require.expose is sufficient in this case, exposeFrom is
  // used for demo's purpose.
  // $void.require.expose('path', 'connect', 'serve-static')
  $void.require.exposeFrom(__filename, 'path', 'connect', 'serve-static')
}
