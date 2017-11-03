module.exports = function(config) {
    config.set({
        basePath: __dirname,
        files: [
            './document-root/lib/*.js',
            './document-root/lib/*.css',
            'test/contextSetup/*.js',
            // './test/includeAllTests.js'
            'test/**/*.test.js',
        ],
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-jasmine-html-reporter',
            'karma-chrome-launcher'
        ],
        frameworks: [
            'jasmine'
        ],
        preprocessors: {
            'app/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*.test.js': ['webpack', 'sourcemap']
        },
        reporters: ['kjhtml'],
        webpack: require('./webpack.config')
    });
}
