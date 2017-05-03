import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'lib/index.js',
  dest: 'watercolor-canvas.js',
  moduleName: 'WatercolorCanvas',
  format: 'umd',
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs()
  ]
}
