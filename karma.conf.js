var path = require('path');

module.exports = function(config) {

  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
        'test/*.spec.js'
    ],

    preprocessors: {
        'test/*.spec.js': ['webpack']
    },

    webpack: {
        cache: true,
        module: {
            loaders: [
                { test: /\.(js|jsx)$/, loader: 'babel' }
            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
            alias: {
                'styles': path.join(process.cwd(), './src/styles/'),
                'components': path.join(process.cwd(), './src/components/')
            }
        }

    },

    webpackServer: {
        noInfo: true,
        stats: {
            colors: true
        }
    },

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

    browsers: ['PhantomJS'],

    singleRun: false

  });

}
