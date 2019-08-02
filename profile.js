'use strict'

var modules = require('eslang/lib/modules')

module.exports = function ($void) {
  modules.expose('path', 'connect', 'serve-static')

  // chain to dependency Espresso modules.
  modules.mount($void, 'es-npm-template-api')
}
