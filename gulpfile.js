var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('deploy', function(){
    return gulp.src(['**', '!gulpfile.js', '!Dockerfile'])
    .pipe(zip('deploy.zip'))
    .pipe(gulp.dest('dest/'))
});

gulp.task('deploysh', function(){
    return gulp.src(['config/deploy.sh'])
    .pipe(gulp.dest('dest/'))
})

gulp.task('default', ['deploysh', 'deploy'], function(){
    
})