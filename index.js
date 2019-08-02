'use strict'

var path = require('path')
var espresso = require('eslang')

// create the void.
var $void = espresso()
require('./profile')($void)

// running as an app.
var args = global.process.argv.slice(2) || []
var appHome = path.join(__dirname, 'es')
module.exports = $void.$run('../server', args, appHome)
