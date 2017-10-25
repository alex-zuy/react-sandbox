module.exports = function(config) {
    config.set({
        basePath: '../',
        files: [
            'test/**/*.test.js',
            './document-root/lib/*.js',
            './document-root/lib/*.css'
        ],
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader'
        ],
        frameworks: [
            'jasmine'
        ],
        preprocessors: {
            'app/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap']

        },
        webpack: require('../webpack.config')
    });
}
