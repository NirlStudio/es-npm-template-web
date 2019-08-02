'use strict'

// This is the glue code to run the default app.
var espresso = require('eslang/web')
// setup native environment.
require('./profile')(espresso)

var web = espresso(/* term, stdin, stdout, loader */)
var initializing = web.run(/* appHome, context, args, app */)
if (!(initializing instanceof Promise)) {
  console.info('app is running.')
} else {
  console.info('app is loading ...')
  initializing.then(function () {
    console.info('app is running now.')
  }, function (err) {
    console.error('app failed to run for', err)
  })
}
