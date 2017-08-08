var gulp = require('gulp');

gulp.task('deploy', function(){
    return gulp.src(['**', '!gulpfile.js', '!Dockerfile', '!node_modules/**'])
    .pipe(gulp.dest('dest/'))
});

gulp.task('default', ['deploy'], function(){
    
})