const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function() {
    return gulp.src([
        'flickrApp/flickrApp.module.js',
        'flickrApp/flickr.service.js',
        'flickrApp/index.controller.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'));
    // @TODO Uglify
});