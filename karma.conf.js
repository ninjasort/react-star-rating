// var webpackConfig = require('./webpack.karmaConfig');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
        'test/*.spec.jsx'
    ],
    preprocessors: {
        'test/*.spec.jsx': ['webpack']
    },
    // webpack: webpacConfig,
    // webpackServer: {
    //     noInfo: true,
    //     stats: {
    //         colors: true
    //     }
    // },
    // coverageReporter: {
    //   type : 'html',
    //   dir : 'coverage/'
    // },
    reporters: ['progress'], // 'coverage'
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
}
