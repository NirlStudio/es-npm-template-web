'use strict'

// This is the glue code to run the default app.
var $void = require('sugly/web')
// setup native environment.
require('./profile')($void)

var sugly = $void(/* term, stdin, stdout, loader */)
var initializing = sugly.run(/* appHome, context, args, app */)
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
