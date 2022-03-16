import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

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
    plugins: [resolve(), commonjs(), buble(), replace({ __VERSION__: `v${pkg.version}` }), terser()]
  },
  {
    input: 'src/index.js',
    external: ['color-name', 'hex-rgb'],
    plugins: [
      resolve(),
      commonjs(),
      replace({ __VERSION__: `v${pkg.version}` }),
      copy({
        targets: [
          {
            src: 'src/index.d.ts',
            dest: 'dist'
          }
        ]
      })
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
