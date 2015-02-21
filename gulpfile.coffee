gulp        = require 'gulp'
browserSync = require 'browser-sync'
reload      = browserSync.reload
data        = require 'gulp-data'
debug       = require 'gulp-debug'
newer       = require 'gulp-newer'
sass        = require 'gulp-sass'
sourcemaps  = require 'gulp-sourcemaps'
minify      = require 'gulp-minify-css'

# lint
jshint      = require 'gulp-jshint'
stylish     = require 'jshint-stylish'

# browserify
browserify  = require 'browserify'
debowerify  = require 'debowerify'
licensify   = require 'licensify'
source      = require 'vinyl-source-stream'
streamify   = require 'gulp-streamify'
uglify      = require 'gulp-uglify'

# // Stylus
stylus      = require 'gulp-stylus'
nib         = require 'nib'
sourcemaps  = require 'gulp-sourcemaps'

# jade
jade        = require 'gulp-jade'

# images
pngmin      = require 'gulp-pngmin'
imagemin    = require 'gulp-imagemin'
jpegtran    = require 'imagemin-jpegtran'

# watch
watch       = require 'gulp-watch'

gulp.task 'css', ->
  gulp.src( './src/stylus/index.styl')
  .pipe(stylus(
            use: nib()
            compress: true
    ))
    .pipe(sourcemaps.write())
    .pipe gulp.dest( './build/css' )

gulp.task 'pngmin', ->
    gulp.src [ 'src/images/*.png', 'src/images/**/*.png' ]
    .pipe newer( './build/images' )
    .pipe pngmin()
    .pipe gulp.dest( './build/images' )

gulp.task 'jpgmin', ->
    gulp.src([ 'src/images/*.jpg', 'src/images/**/*.jpg', 'src/images/*.jpeg', 'src/images/**/*.jpeg' ])
    .pipe imagemin(
        prpgressive: true
        svgoPlugins: [ { removeViewBox: false } ]
        use: [ jpegtran() ]
    )
    .pipe gulp.dest( './build/images' )


gulp.task 'browser', ->
    browserSync server:
        baseDir: 'build'
        directory: true
    return


gulp.task 'templates', ->
    gulp.src([ './src/jade/*.jade', './src/jade/**/*.jade'])
    # .pipe data ( file ) ->
    #     return require './src/jade/index.json'
    .pipe(jade(pretty: true))
    .pipe gulp.dest('./build/')
    return

gulp.task 'lint', ->
    gulp.src([
        './src/javascripts/*.js'
        './src/javascripts/**/*.js'
    ])
    .pipe jshint()
    .pipe jshint.reporter stylish
    return

gulp.task 'browserify', ->
    browserify
        entries: ['./src/javascripts/index.coffee']
        extensions: ['.coffee', '.js']
    .plugin licensify
    .transform 'coffeeify'
    .transform 'debowerify'
    .bundle()
    .pipe source('bundle.min.js')
    .pipe streamify uglify()
    .pipe gulp.dest './build/javascripts/'
    # return


gulp.task 'watch', ->
    gulp.watch [
        './src/javascripts/*.coffee'
        './src/javascripts/**/*.coffee'
        './src/javascripts/**/**/*.coffee'
    ],[
        'lint'
        'browserify'
        reload
    ]
    gulp.watch [
        './src/jade/*.jade'
        './src/jade/**/*.jade'
    ],[
        'templates'
        reload
    ]
    gulp.watch [
        './src/css/*.styl'
        './src/css/**/*.styl'
    ],[
        'css'
        reload
    ]
    gulp.watch [
        './src/images/*'
        './src/images/**/*'
    ],[
        'pngmin'
        'jpgmin'
        reload
    ]
    return

gulp.task 'default', [
    'css'
    'lint'
    'browser'
    'templates'
    'pngmin'
    'jpgmin'
    'watch'
]
