var path = require('path')
var assert = require('assert')

var espresso = require('eslang')

// create the void.
var $void = espresso()
require('../profile')($void)

var appHome = path.resolve(__dirname, '../es/@')
var space = $void.createBootstrapSpace(appHome)

describe('es/api', function () {
  describe('api', function () {
    it('api is an express middleware', function () {
      var mod = space.$import('./api')
      assert.strict.equal(typeof mod, 'object')

      var api = mod.api
      assert.strict.equal(typeof api, 'object')
      assert.strict.equal(typeof api.get, 'function')
      assert.strict.equal(typeof api.post, 'function')
      assert.strict.equal(typeof api.put, 'function')
      assert.strict.equal(typeof api.delete, 'function')
    })
  })
})
