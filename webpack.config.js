const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const env = process.env.NODE_ENV || 'local';
const mode = (env === 'prod' || env === 'staging') ? 'production' : 'development';
const isProductionMode = mode === 'production';

module.exports = {
    mode,
    optimization: {
        minimize: isProductionMode ? true : false,
        minimizer: [new TerserPlugin()],
    },
    entry: ['./src/scss/index.scss'],
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            prependData: '$env: ' + env + ';',
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'faststylehub.css',
        }),
    ],
};
