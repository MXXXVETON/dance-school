const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const connect = require('gulp-connect')

gulp.task('styles', () => (
  gulp.src(['./scss/**/*.scss'])
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
    }))
    .pipe(gulp.dest('css/'))
    .pipe(connect.reload())
))

gulp.task('connect', () => {
  connect.server({
    root: './',
    host: 'localhost',
    port: '3000',
    livereload: true
  })
})

gulp.task('watch', () => {
  gulp.watch(['scss/**/*.scss'], ['styles'])
})

gulp.task('default', ['styles', 'connect', 'watch'])

