'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    base64 = require('gulp-base64'),
    webserver = require('gulp-webserver'),
    autoprefixer = require('autoprefixer');

// 目标清理
// gulp.task('clean', function () {
//     gulp.src('./dist', {read: false})
//         .pipe(clean());
// });

// css
gulp.task('css', function () {
    gulp.src('./src/css/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
        .pipe(base64({
            maxImageSize: 20 * 1024
        }))
        .pipe(gulp.dest('./dist/css'));
});

// copy index.html
gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

// copy js
gulp.task('js', function () {
    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'));
});

// 使用webserver启动一个Web服务器
gulp.task('webserver', function(){
    gulp.src('./')
        .pipe(webserver({
            // livereload: true,
            open: true,
            port: 8001
        }));
});

// 预设任务
gulp.task('default', ['html', 'js', 'css', 'webserver', 'watch']);

// 文档临听
gulp.task('watch', function () {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/css/*.scss', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
});
