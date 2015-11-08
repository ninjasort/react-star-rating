var path = require('path');

module.exports = function(config) {

  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
        'src/**/*.jsx',
        'test/*.spec.js'
    ],

    preprocessors: {
        'src/**/*.jsx': ['babel'],
        'test/*.spec.js': ['babel']
    },

    reporters: ['progress'], // 'coverage'

    port: 9876,

    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false

  });

}
