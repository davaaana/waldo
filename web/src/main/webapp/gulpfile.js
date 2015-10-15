var args = require('yargs').argv;
var config = require('./gulp.config.js')();
var del = require('del');
var gulp = require('gulp');


var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('aldaa', function () {
    log('Code-n aldaag JSHINT and JSCS-aar shalgaval:');
    return gulp.src(config.gulpfiles)
        .pipe($.if(args.verbose, $.print())) // print which file in pipe
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail')); // if inspect fail
});

gulp.task('style', ['clean-style'], function () {
    log('CSS automation process: Autoprefixer');

    return gulp.src(config.css) // CSS location
        .pipe($.plumber())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp)); // temp location

});

gulp.task('clean-style', function (done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

gulp.task('style-watcher', function() {
    gulp.watch([config.css], ['style']);
});

gulp.task('wiredep', function() {
    var options = config.getWiredepDefaultOptions(); // all options
    var wiredep = require('wiredep').stream;

    return gulp.src(config.index) //index
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.customjs))) //all custom javascript
        .pipe(gulp.dest('./')); // source folder
});

/*==================== FUNCTIONS =======================*/

// delete file function
function clean(path, done) {
    log('Cleaning:' + $.util.colors.red(path));
    del(path, done);
};

//// Log show funtions
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
};
