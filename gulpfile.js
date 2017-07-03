var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('deploy', function(){
    return gulp.src(['**', '!package.json', '!gulpfile.js', '!Dockerfile'])
    .pipe(zip('deploy.zip'))
    .pipe(gulp.dest('dest/'))
});

gulp.task('default', function(){
    gulp.run('deploy');
})