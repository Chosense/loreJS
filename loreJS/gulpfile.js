/// <binding AfterBuild='afterBuild' ProjectOpened='default' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

gulp.task('default', function () {
    
});

gulp.task("copy:js", function () {
    gulp.src("./TypeScript/*.js")
        .pipe(gulp.dest("./../dist/"))
        .pipe(gulp.dest("./wwwroot/js/loreJS/"));
});

gulp.task("copy:typeDefs", function () {
    gulp.src("./TypeScript/*.d.ts")
        .pipe(gulp.dest("./../dist"));
});

gulp.task("afterBuild", ["copy:typeDefs", "copy:js"]);