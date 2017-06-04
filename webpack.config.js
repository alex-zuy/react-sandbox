const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SassThemesCompilePlugin = require('./SassThemesCompilePlugin.js');

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
                    presets: ['es2015', 'react'],
                    plugins: [
                        ['babel-plugin-react-css-modules', {
                            // removeImport: true,
                            filetypes: {
                                '.scss': 'postcss-scss'
                            }
                        }]
                    ]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: {
                        loader: 'postcss-loader',
                        options: {
                            syntax: 'postcss-scss',
                            plugins: [
                                require('postcss-modules')({
                                    getJSON: (cssFileName, json) => {},
                                    generateScopedName: '[path]___[name]__[local]___[hash:base64:5]',
                                })
                            ]
                        }
                    }
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.scss',
            allChunks: true,
            ignoreOrder: true
        }),
        new SassThemesCompilePlugin()
    ],
    devtool: __DEV__ ? 'inline-source-map' : 'source-map'
};
