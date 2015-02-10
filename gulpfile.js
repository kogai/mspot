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

// watch
var watch       = require('gulp-watch');

gulp.task('templates', function(){
    return gulp.src( './src/jade/*.jade' )
        .pipe(jade({
            pretty: true
        }))
        .pipe( gulp.dest('./build/'));
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
        .pipe( gulp.dest('./build/js/') );
});


gulp.task( 'watch', function() {
    gulp.watch( [ './src/javascripts/**/*.js' ], [ 'lint', 'browserify' ] );
});

gulp.task('default', [ 'lint', 'browserify', 'watch' ]);
