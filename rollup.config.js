// rollup.config.js
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';        //js压缩;
console.log(uglify)
export default {
    input: 'src/main.js',
    output: {
        file: 'dist/pageChannel.min.js',
        format: 'umd',
        name: 'PageChannel'
    },
    plugins: [
        json(),
        uglify(), 
        babel({
          exclude: 'node_modules/**' // only transpile our source code
        })
    ]
};