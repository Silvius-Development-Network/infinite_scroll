var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var connect = require("gulp-connect");
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemap = require("gulp-sourcemaps");
// var flatMap = require('flat-map').default
// var scaleImages = require('gulp-scale-images');

function processHTML() {
	return gulp.src("src/html/**/*.html")
		.pipe(gulp.dest("dist/"))
		.pipe(connect.reload());
}

function processSass() {
	return gulp.src("src/sass/**/*.scss")
		.pipe(sourcemap.init())
		.pipe(sass())
		// .pipe(cleanCSS({ compatibility: "ie9" }))
		.pipe(sourcemap.write("."))
		.pipe(gulp.dest("dist/assets/css"))
		.pipe(connect.reload());
}

function processJS() {
	return gulp.src("src/js/**/*.js")
		.pipe(sourcemap.init())
		.pipe(babel({
		presets: ['@babel/env']
	}))
		
		.pipe(concat("all.js"))
		.pipe(sourcemap.write("."))
		.pipe(gulp.dest("dist/assets/js"))
		.pipe(connect.reload());
}

function watch() {
	gulp.watch("src/sass/**/*.scss",
	{ ignoreInitial: false },
	processSass);
	gulp.watch("src/html/**/*.html",
	{ ignoreInitial: false },
	processHTML);
	gulp.watch("src/js/**/*.js", {ignoreInitial: false},
	processJS);
	
}

function server() {
  return connect.server({
    root: 'dist',
    livereload: true
  });
}

gulp.task("default", gulp.parallel(server, watch));
