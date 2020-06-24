const rollup = require('rollup')
const nodeResolve = require('@rollup/plugin-node-resolve').default
const commonJs = require('@rollup/plugin-commonjs')
const babel = require('@rollup/plugin-babel').default
const uglify = require('rollup-plugin-uglify').uglify
const { server } = require('./server')
const { isProd, destDir } = require('../etc/build-config')
const log = require('fancy-log')

const inputOptions = {
  input: 'src/scripts/index.js',
  plugins: [
    nodeResolve(),
    commonJs(),
    babel({ babelHelpers: 'bundled' }),
    ...(isProd ? [uglify()] : []),
  ],
}

const outputOptions = {
  file: `${destDir}/script.js`,
  format: 'iife',
  sourcemap: !isProd,
}

const compileScripts = async () => {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

const watchScripts = () => {
  const watcher = rollup.watch({
    ...inputOptions,
    output: outputOptions,
  })
  watcher.on('event', (event) => {
    switch (event.code) {
      case 'END':
        log('Recompiled scripts')
        server.reload()
        break
    }
  })
}

module.exports = {
  compileScripts,
  watchScripts,
}
