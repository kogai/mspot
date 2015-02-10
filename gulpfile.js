var gulp        = require('gulp');

// jshint
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');

// browserify
var browserify  = require('browserify');
var debowerify  = require('debowerify');
var source      = require('vinyl-source-stream');
var streamify   = require('gulp-streamify');
var uglify      = require('gulp-uglify');

// jade
var jade        = require('gulp-jade');

// Stylus
var stylus      = require('gulp-stylus');
var nib         = require('nib');
var sourcemaps  = require('gulp-sourcemaps');


gulp.task('stylus', function(){
    return gulp.src('./src/stylus/index.styl')
        .pipe( stylus({
            use: nib(),
            compress: true
        }))
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( './build/public/css/' ))
});

gulp.task('jade', function(){
    return gulp.src( './src/jade/*.jade' )
        .pipe(jade({
            pretty: true
        }))
        .pipe( gulp.dest('./build/public/'));
});

gulp.task('lint', function(){
    return gulp.src('./src/javascripts/lib/*.js')
        .pipe( jshint() )
        .pipe( jshint.reporter( stylish ) );
});

gulp.task('browserify', function() {
    return browserify('./src/javascripts/index.js')
        .transform( debowerify )
        .bundle()
        .pipe( source( 'bundle.min.js') )
        .pipe( streamify( uglify() ) )
        .pipe( gulp.dest('./build/public/javascripts/') );
});


gulp.task( 'watch', function() {
    gulp.watch( [ './src/stylus/*.styl', './src/stylus/**/*.styl' ], [ 'stylus' ] );
    gulp.watch( [ './src/jade/*.jade', './src/jade/**/*.jade' ], [ 'jade' ] );
    gulp.watch( [ './src/javascripts/**/*.js' ], [ 'lint', 'browserify' ] );
});

gulp.task( 'default', [ 'stylus', 'jade', 'lint', 'browserify', 'watch' ] );
