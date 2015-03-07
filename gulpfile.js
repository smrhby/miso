var gulp = require('gulp');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

//sass
gulp.task('sass', function(){
	gulp.src('./src/sass/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sass())
		.pipe(gulp.dest('./public/css'))
    	.pipe(connect.reload());
});

//copy
gulp.task('copy', function(){
	gulp.src('./src/*.html')
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
});

//watch
gulp.task('watch', ['sass', 'copy'], function(){
	gulp.watch('./src/sass/*.scss', ['sass']);
	gulp.watch('./src/*.html', ['copy']);
});

//server
gulp.task('server', function(){
	connect.server({
		root: './public',
		livereload: true
	});
});

gulp.task('default',['watch', 'server']);