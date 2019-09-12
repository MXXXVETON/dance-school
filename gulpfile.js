const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
// const minifycss = require('gulp-clean-css')
const concat = require('gulp-concat')
const fileinclude = require('gulp-file-include')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')
const connect = require('gulp-connect')
const svgSprite = require('gulp-svg-sprite')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')

const srcDirectory = './src/'
const buildDirectory = './build/'

const vendorsJs = [
  // vendors js paths
  srcDirectory + '/vendors/jquery/jquery-3.3.1.min.js',
  srcDirectory + '/vendors/tooltipster/tooltipster.bundle.min.js',
  srcDirectory + '/vendors/wow/wow.js',
  srcDirectory + '/vendors/slick/slick.min.js',
]
const vendorsCSS = [
  // vendors css paths
  srcDirectory + '/vendors/tooltipster/tooltipster.bundle.min.css',
  srcDirectory + '/vendors/wow/animate.css',
  srcDirectory + '/vendors/slick/slick.css',
]

/** build html pages */
gulp.task('html', () => (
  gulp.src([srcDirectory + 'html/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: srcDirectory + 'html-components'
    }))
    .pipe(gulp.dest(buildDirectory))
    .pipe(connect.reload())
))

/** images minify */
gulp.task('images', () => (
  gulp.src([srcDirectory + 'img/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest(buildDirectory + 'img'))
))

/** copy fonts to build folder */
gulp.task('fonts', () => (
  gulp.src([srcDirectory + 'fonts/*'])
    .pipe(gulp.dest(buildDirectory + 'fonts'))
))

/** copy videos to build folder */
gulp.task('videos', () => (
  gulp.src([srcDirectory + 'videos/*'])
    .pipe(gulp.dest(buildDirectory + 'videos'))
))

/** build style files */
gulp.task('styles', () => (
  gulp.src([srcDirectory + 'scss/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    // .pipe(minifycss()) TODO:
    .pipe(gulp.dest(buildDirectory + 'css/'))
    .pipe(connect.reload())
))

gulp.task('vendors-styles', () => (
  gulp.src(vendorsCSS)
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(buildDirectory + 'css/'))
))

/** build js */
gulp.task('scripts', () => (
  gulp.src([srcDirectory + 'js/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(buildDirectory + 'js/'))
    .pipe(connect.reload())
))

gulp.task('vendors-scripts', () => (
  gulp.src(vendorsJs)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(buildDirectory + 'js/'))
))

/** connect server with live reload and watcher */
gulp.task('connect', () => {
  connect.server({
    root: './build',
    host: 'localhost',
    port: '3000',
    livereload: true
  })
})

gulp.task('watch', () => {
  gulp.watch([srcDirectory + 'html/**/*.html', srcDirectory + 'html-components/**/*.html'], ['html'])
  gulp.watch([srcDirectory + 'scss/**/*.scss'], ['styles'])
  gulp.watch([srcDirectory + 'js/**/*.js'], ['scripts'])
  // gulp.watch([srcDirectory + 'img/*'], ['images'])
})

/**
* Run tasks
*/

gulp.task('default', ['html', 'styles', 'scripts', 'vendors-scripts', 'vendors-styles', 'fonts', 'images', 'videos', 'connect', 'watch'])
gulp.task('build', ['html', 'styles', 'scripts', 'vendors-scripts', 'vendors-styles', 'fonts', 'images', 'videos'])