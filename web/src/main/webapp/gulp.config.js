module.exports = function () {
    var appSrc = './src/modules/';
    var config = {
        temp: './.temp/',

        //all gulp files
        gulpfiles: ['./*.js'],

        index: 'index.html',
        appSrc: appSrc,
        customjs: [
            appSrc + '**/*.module.js',
            appSrc + '**/*.js'
        ],
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        },
        css: './assets/app.css'
    };
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

        return config;
};
