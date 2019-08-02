const fs = require('fs')
const path = require('path')

const shell = require('shelljs')
const webpack = require('webpack')
const HooksPlugin = require('hooks-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MODE_PROD = 'production'
const MODE_DEV = 'development'

const ignoreNativeModules = new webpack.IgnorePlugin(
  /^(\.\/loader-fs|node-localstorage|colors\/safe)$/
)

const prepareWebSite = new HooksPlugin({
  beforeRun: () => {
    fs.existsSync('dist') || shell.mkdir('dist')
    fs.existsSync('dist/www') && shell.rm('-rf', 'dist/www')
    shell.mkdir('dist/www')
    shell.mkdir('dist/www/es')
    shell.mkdir('dist/www/es/modules')
    shell.mkdir('dist/www/es/test')
  },
  'beforeCompile@': (params, callback) => {
    var dependencies = params.compilationDependencies
    if (dependencies.includeEspressoFiles) {
      return callback()
    }
    readDir('es/', file => {
      if (file.endsWith('.es') && !dependencies.has(file)) {
        dependencies.add(file)
      }
    })
    dependencies.includeEspressoFiles = true
    callback()
  },
  done: () => {
    var output = 'dist/www/'
    shell.cp('web/favicon.ico', output)
    shell.cp('-r', 'web/img', output)
    shell.cp('-r', 'web/style', output)
    shell.cp('-r', 'es/*', output)

    var runtime = 'node_modules/eslang/'
    output += 'es/'
    shell.cp(runtime + 'profile.es', output)
    shell.cp(runtime + 'web/*.es', output)
    shell.cp(runtime + 'modules/*.es', output + 'modules/')
    shell.cp(runtime + 'test/test.es', output + 'test/')
    shell.cp('-r', runtime + 'examples/', output)
    shell.cp('-r', runtime + 'spec/', output)
    shell.cp('-r', runtime + 'tools/', output)
  }
})

const injectJavaScript = new HtmlWebpackPlugin({
  template: 'web/index.html'
})

module.exports = (env, options) => {
  const mode = options.mode === MODE_PROD ? MODE_PROD : MODE_DEV
  const name = mode === MODE_PROD ? 'app.min' : 'app'
  return {
    mode,
    entry: './web/index.js',
    plugins: [
      ignoreNativeModules,
      prepareWebSite,
      injectJavaScript
    ],
    output: {
      filename: `${name}.js`,
      path: path.resolve(__dirname, 'dist/www'),
      sourceMapFilename: `${name}.map`
    },
    devtool: 'source-map',
    devServer: {
      port: 6503,
      publicPath: '/',
      contentBase: 'dist/www',
      hot: true,
      open: true
    }
  }
}

function readDir (dir, callback) {
  var files = fs.readdirSync(dir)
  files.forEach((file) => {
    file = path.join(dir, file)
    fs.statSync(file).isDirectory()
      ? readDir(file, callback)
      : callback(file)
  })
}
