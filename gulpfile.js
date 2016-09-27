const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel  = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const cache = require('gulp-cache');

gulp.task('clean', function(){
  return del.sync('dist');
});

gulp.task('clear', function(){
  return cache.clearAll();
});

gulp.task('default',['clean'], () => {
  return gulp.src('app/js/main.js')
    .pipe(babel({
      presets: ['es2015','react']
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', () => {
  del.sync('dist/js');
  return gulp.src('app/js/**/*.jsx')
    .pipe(babel({
      presets: ['es2015','react']
    }))
    .pipe(rename(function (path) {
    path.extname = ".js"
  }))
    .pipe(gulp.dest('dist/js'));
});
gulp.task('html',() => {
  del.sync('dist/*.html');
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('libsjs', function(){
  return gulp.src([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/bootstrap/dist/js/bootstrap.min.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error',sass.logError))
    .pipe(autoprefixer(['last 15 versions','>1%','ie 8','ie 7'],{cascade: true}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['sass','libsjs', 'scripts', 'html'], () => {
  gulp.watch('app/js/**/*.jsx', ['scripts']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/sass/**/*.sass', ['sass']);
});
