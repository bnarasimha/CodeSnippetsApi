var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('deploy', function(){
    return gulp.src(['**', '!gulpfile.js', '!Dockerfile', '!node_modules/**'])
    .pipe(zip('deploy.zip'))
    .pipe(gulp.dest('dest/'))
});

gulp.task('default', function(){
    gulp.run('deploy');
})