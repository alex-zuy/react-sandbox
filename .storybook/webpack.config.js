module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
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
            }
        ]
    }
};

// module.exports = (storybookConfig, configType) => {
//
// };
