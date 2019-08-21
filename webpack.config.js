const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const src = './resources/src';
const dist = './resources/dist';

module.exports = {
    entry: {
        main: `${src}/vue/main.js`
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, `${dist}/vue`),
        library: 'test'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: ['/node_modules'],
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}