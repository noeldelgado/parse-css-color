import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'parseCssColor'
    },
    plugins: [resolve(), commonjs(), buble(), terser()]
  },
  {
    input: 'src/index.js',
    external: ['color-name', 'hex-rgb'],
    plugins: [resolve(), commonjs()],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
