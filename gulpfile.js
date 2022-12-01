const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const clean = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include');

gulp.task('connect', function (done) {
    connect.server({
        root: 'public',
        livereload: true
    });

    done();
});

gulp.task('fileinclude', function (done) {
    gulp.src(['./src/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./public/'));
    done();
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed",
        }).on("error", sass.logError))
        // .pipe(autoprefixer({
        // 	overrideBrowserslist: ['last 8 versions'],
        // 	browsers: [
        // 		'Android >= 4',
        // 		'Chrome >= 20',
        // 		'Firefox >= 24',
        // 		'Explorer >= 11',
        // 		'iOS >= 6',
        // 		'Opera >= 12',
        // 		'Safari >= 6',
        // 	],
        // }))
        .pipe(concat('main.min.css'))
        .pipe(clean({
            level: 2
        }))
        .pipe(sourcemaps.write('../sourcemaps/'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('livereload', function (done) {
    gulp.src('./public/**/*')
        .pipe(connect.reload());
    done()
});

gulp.task('watch', function (done) {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/**/*.html', gulp.series('fileinclude'));
    gulp.watch('./public/**/*', gulp.series('livereload'));
    done();
});

gulp.task('default', gulp.series('connect', 'watch', 'fileinclude', 'sass'));