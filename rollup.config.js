import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import multi from '@rollup/plugin-multi-entry'
import injectProcessEnv from 'rollup-plugin-inject-process-env'

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json')

const globals = {
  ...packageJson.dependencies,
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        inlineDynamicImports: true,
        file: packageJson.main,
        format: 'cjs', // commonJS
        sourcemap: true,
      },
      {
        inlineDynamicImports: true,
        file: packageJson.module,
        format: 'esm', // ES Modules
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
      typescript({
        clean: true,
      }),
      commonjs({
        exclude: 'node_modules',
        ignoreGlobal: true,
      }),
      injectProcessEnv({
        npm_package_version: packageJson.version,
      }),
      terser(),
    ],
    external: [...Object.keys(globals)],
  },
  {
    input: ['dist/index.d.ts', 'dist/types/index.d.ts'],
    output: {
      format: 'es',
      inlineDynamicImports: true,
      file: packageJson.types,
    },
    plugins: [multi(), dts({ compilerOptions: { baseUrl: 'dist' } })],
  },
]
