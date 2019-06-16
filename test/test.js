var path = require('path')
var assert = require('assert')

var sugly = require('sugly')

// create the void.
var $void = sugly()
require('../profile')($void)

var appHome = path.resolve(__dirname, '../sugly/@')
var space = $void.createBootstrapSpace(appHome)

describe('sugly/api', function () {
  describe('todo', function () {
    it('todo.api is an express middleware', function () {
      var todo = space.$import('api/todo')
      assert.strict.equal(typeof todo.api, 'function')
      var api = todo.api
      assert.strict.equal(typeof api.get, 'function')
      assert.strict.equal(typeof api.post, 'function')
      assert.strict.equal(typeof api.put, 'function')
      assert.strict.equal(typeof api.delete, 'function')
    })
  })
})
