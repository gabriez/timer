const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')


let mode = 'development';
let target = 'web';
const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' })
]

if (process.env.NODE_ENV == 'production') {
    mode = 'production';
    target = 'browserslist';
}

if (process.env.NODE_SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode: mode,
    target: target,


    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '' }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        static: '/dist',
        hot: true
    }
}