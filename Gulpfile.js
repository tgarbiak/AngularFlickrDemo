"use strict";

const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const Karma = require('karma').Server;

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

gulp.task('test', function(done) {
   new Karma({
       configFile: __dirname + '/karma.conf.js',
       singleRun: true
   }, done)
      .start();
});