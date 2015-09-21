var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify');

var sassSources = './components/sass/*.scss',
	jsSources = './components/scripts/*.js';

gulp.task('sass', function() {
	gulp.src(sassSources)
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('./css'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src('./*.html').pipe(connect.reload());
});

gulp.task('minify', function() {
	gulp.src(jsSources)
		.pipe(uglify())
		.pipe(gulp.dest('./js'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(sassSources, ['sass']);
	gulp.watch('./*.html', ['html']);
	gulp.watch(jsSources, ['minify'])
});

gulp.task('connect', function(){
	connect.server({
		root: '../solo-guitarist/',
		livereload: true
	});
});

gulp.task('default', ['sass', 'watch', 'connect', 'minify']);