import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import multi from '@rollup/plugin-multi-entry'

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
      typescript({
        clean: true
      }),
      commonjs({
        exclude: 'node_modules',
        ignoreGlobal: true
      }),
      terser()
    ],
    external: Object.keys(globals)
  },
  {
    input: ['dist/index.d.ts', 'dist/types/index.d.ts'],
    output: {
      format: 'es',
      file: packageJson.types
    },
    plugins: [multi(), dts()]
  }
]
