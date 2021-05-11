import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json')

const globals = {
  ...packageJson.devDependencies
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs', // commonJS
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm', // ES Modules
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript(),
      commonjs({
        exclude: 'node_modules',
        ignoreGlobal: true
      }),
      terser()
    ],
    external: Object.keys(globals)
  },
  {
    input: packageJson.types,
    output: {
      format: 'es',
      file: 'index.d.ts'
    },
    plugins: [dts()]
  }
]
