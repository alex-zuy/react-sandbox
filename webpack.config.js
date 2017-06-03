const path = require('path');

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
                    plugins: ['babel-plugin-react-css-modules']
                }
            }
        ]
    }
};
