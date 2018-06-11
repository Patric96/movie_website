'use strict';

//Require gulp and its modules to make it available
var gulp = require ("gulp");
var concat = require ("gulp-concat");
var uglify = require ("gulp-uglify");
var rename = require ("gulp-rename");
var sass = require ("gulp-sass");
var sourcemaps = require ("gulp-sourcemaps");

//Gulp needs a task, so let's create one | 1. The first parameter (in this case "concatScripts" is the task's name)
//Start the ConcateScripts Task
gulp.task("concatScripts", function () {
  return gulp.src([
    "js/jquery.js",
    "js/sticky/jquery.sticky.js",
    "js/main.js"])
      //Add Source Maps
    .pipe(sourcemaps.init())
    //Pipe sends the readable stream of data to the concatScripts Task | concat takes a parameter of the name of the file u want to create
    .pipe(concat("app.js"))
    //Define the path of Source Maps (relative)
    .pipe(sourcemaps.write("./"))
    //Defining the path where the file should be created
    .pipe(gulp.dest("js"));
});
//Start the Uglify Tasktest
gulp.task("minifyScripts",["concatScripts"], function () {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("js"))
});

//Start the Sass to CSS Task
gulp.task("compileSass", function () {
  return gulp.src("scss/application.scss")
  //Define the source map plugin
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("css"))
});

gulp.task("watchSass", function (){
  gulp.watch("scss/**/*.scss", ["compileSass"])
})

//Give the first Parameter the name "default" to define it as a gulp default task | In this case, we add a dependencie ("concatScripts"),that runs before the default task
gulp.task("build", ["minifyScripts", "compileSass"], function () {
  console.log("I am a default task")
});
