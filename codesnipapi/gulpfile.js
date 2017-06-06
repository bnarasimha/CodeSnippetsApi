var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('deploy', function(){
    return gulp.src(['**'])
    .pipe(zip('deploy.zip'))
    .pipe(gulp.dest('../'))
});

gulp.task('default', function(){
    gulp.run('deploy');
})