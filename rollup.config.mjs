import { globbySync } from 'globby';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';

const isProd = process.env.mode === 'prod';

const bundler = () => {
  let bundles = []

  globbySync(['src/*.js']).forEach(file => {
    let outputFilePath = file.replace(/src\/(.*)/, (...args) => {
      return 'dest/' + args[1];
    });

    bundles.push({
      input: file,
      output: {
        file: outputFilePath,
        sourcemap: !isProd,
      },
      plugins: [
        commonjs(),
        nodeResolve(),
        url(),
      ].concat(
        isProd ? [
          babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env'],
          }),
          terser(),
        ] : []
      ),
    })
  })

  return bundles;
}

export default bundler;