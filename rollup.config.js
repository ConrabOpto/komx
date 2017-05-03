import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    plugins: [
        commonjs(),
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules',
            }
        }),
        babel({
            exclude: 'node_modules/**'
        })
    ],
    external: ['knockout'],
    globals: { knockout: 'ko' },
    moduleName: 'komx',
    targets: [
        { dest: 'dist/komx.umd.js', format: 'umd' },
        { dest: 'dist/komx.es.js', format: 'es' }
    ],
};
