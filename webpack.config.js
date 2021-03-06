const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const __PROD__ = process.env.NODE_ENV === 'production';
const __DEV__ = process.env.NODE_ENV === 'development';

if(!__PROD__ && !__DEV__) {
    throw new Error('Invalid node environment!');
}

module.exports = {
    entry: [
        'babel-polyfill',
        './app/index.jsx',
    ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './document-root/dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx|\.js$/,
                loader: 'babel-loader',
                options: {
                    sourceMaps: true,
                    presets: ['es2015', 'react'],
                    plugins: [
                        ['babel-plugin-react-css-modules', {
                            filetypes: {
                                '.scss': {
                                    syntax: 'postcss-scss',
                                    plugins: ["postcss-nested"]
                                }
                            }
                        }]
                    ]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: ['./app/themes/']
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true,
            ignoreOrder: true
        }),
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    // devtool: __DEV__ ? 'inline-source-map' : 'source-map'
    devtool: 'inline-source-map'
};
