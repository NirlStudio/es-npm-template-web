'use strict'

var modules = require('sugly/lib/modules')

module.exports = function ($void) {
  modules.expose('path', 'connect', 'serve-static')

  // chain to dependency sugly modules.
  modules.mount($void, 'sugly-npm-template-api')
}
