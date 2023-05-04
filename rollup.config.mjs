import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import dtsBundle from 'rollup-plugin-dts-bundle'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import packageJson from './package.json' assert { type: 'json' }

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
        format: 'es', // ES Modules
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
      dtsBundle({
        bundle: {
          name: packageJson.name,
          main: 'dist/index.d.ts',
        },
        verbose: true,
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
]
