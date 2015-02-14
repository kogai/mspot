var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// jshint
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');

// browserify
var browserify  = require('browserify');
var debowerify  = require('debowerify');
var source      = require('vinyl-source-stream');
var streamify   = require('gulp-streamify');
var uglify      = require('gulp-uglify');
var coffee      = require('gulp-coffee');
var gutil       = require('gulp-util');

// jade
var jade        = require('gulp-jade');

// Stylus
var stylus      = require('gulp-stylus');
var nib         = require('nib');
var sourcemaps  = require('gulp-sourcemaps');

var sourceDefiner = function( dest ){
    this.root           = dest;
    this.stylus         = this.root + '/stylus' ;
    this.css            = this.root + '/css' ;
    this.jade           = this.root + '/jade' ;
    this.javascripts    = this.root + '/javascripts' ;
    this.bundle         = 'bundle.min.js'
}

var src                 = new sourceDefiner('./src');
var build               = new sourceDefiner('./build');


gulp.task('stylus', function(){
    return gulp.src( src.stylus + '/index.styl' )
        .pipe( stylus({
            use: nib(),
            compress: true
        }))
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( build.css ))
});

gulp.task('jade', function(){
    return gulp.src( src.jade + '/*.jade' )
        .pipe(jade({
            pretty: true
        }))
        .pipe( gulp.dest( build.root ));
});

gulp.task('lint', function(){
    return gulp.src( src.javascripts + '/lib/*.js' )
        .pipe( jshint() )
        .pipe( jshint.reporter( stylish ) );
});

gulp.task('browserify', function() {
    return browserify( src.javascripts + '/index.js' )
        .transform( debowerify )
        .bundle()
        .pipe( source( build.bundle ) )
        .pipe( streamify( uglify() ) )
        .pipe( gulp.dest( build.javascripts ) );
});

gulp.task( 'coffee', function(){
    gulp.src( src.javascripts + '/lib/*.coffee' )
        .pipe(
            coffee({
                bare: true,
            })
            .on( 'error', gutil.log )
        )
        .pipe( gulp.dest( './src/javascripts/lib'))
});

gulp.task( 'browserSync', function(){
    browserSync({
        server: {
            baseDir: './build',
            directory: true
        }
    });
});

gulp.task( 'watch', function() {
    gulp.watch( [ src.stylus + '/*.styl', src.stylus + '/**/*.styl' ], [ 'stylus', reload ] );
    gulp.watch( [ src.jade + '/*.jade', src.jade + '/**/*.jade' ], [ 'jade', reload ] );
    gulp.watch( [ src.javascripts + '/*.coffee', src.javascripts + '/**/*.coffee' ], [ 'coffee' ] );
    gulp.watch( [ src.javascripts + '/*.js', src.javascripts + '/**/*.js' ], [ 'lint', 'browserify', reload ] );
});

gulp.task( 'default', [ 'stylus', 'jade', 'coffee', 'lint', 'browserify', 'watch', 'browserSync' ] );
