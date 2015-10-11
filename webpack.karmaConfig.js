var path = require('path');

module.exports = {
    cache: true,
    // devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel?stage=0'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': path.join(process.cwd(), './src/sass'),
            'components': path.join(process.cwd(), './src')
        }
    }
    // postLoaders: [
    //     { 
    //         // delays coverage til after tests are run, fixing transpiled source coverage error
    //         test: /\.jsx?$/,
    //         exclude: /(test|node_modules|bower_components)\//,
    //         loader: 'istanbul-instrumenter' 
    //     }
    // ]
};