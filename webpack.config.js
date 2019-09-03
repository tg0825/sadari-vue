const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const src = path.resolve(__dirname, 'resources/src');
const dist = path.resolve(__dirname, 'resources/dist');

module.exports = {
    entry: {
        main: `./main.js`
    },
    output: {
        filename: 'main.js',
        path: `${dist}/vue`,
        library: 'vue'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    // process.env.NODE_ENV !== 'production'
                    // ? 'vue-style-loader'
                    // : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css/,
                use: [
                    'css-loader',
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
            '@': `${src}`,
            Layout: `${src}/vue/layout/`,
            Component: `${src}/vue/component/`,
        },
        extensions: ['.js', '.vue']
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        })
    ],
}