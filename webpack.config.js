const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const src = path.resolve(__dirname, 'resources/src');
const dist = path.resolve(__dirname, 'resources/dist');

module.exports = {
    entry: {
        main: `${src}/vue/main.js`
    },
    output: {
        filename: 'main.js',
        path: `${dist}/vue`,
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
    resolve: {
        alias: {
            // vue component
            Component: `${src}/vue/component/`
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}