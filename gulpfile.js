var gulp        = require("gulp"),
    webserver   = require("gulp-webserver"),
    sass        = require("gulp-sass"),
    jade        = require("gulp-jade"),
    bower       = require("gulp-bower"),
    sourcemaps  = require("gulp-sourcemaps"),
    babel       = require("gulp-babel"),
    concat      = require("gulp-concat"),
    config = {
      style: {
        main: "./app/sass/app.scss",
        watch: "./app/**/*.scss",
        output: "./final/css"
      },
      js: {
        main: "./app/js/app.js",
        watch: "./app/**/*.js",
        output: "./final/js"
      },
      jade: {
        main: "./app/index.jade",
        watch: "./app/**/*.jade",
        output: "./final",
        lib: "./app/views/**/*.jade",
        outputLib: "./final/views/"
      },
      bower: {
        main: "./bower_components",
        output: "./final/vendor"
      }
    };

gulp.task("server", function() {
  gulp.src("./final")
    .pipe(webserver({
      host: "0.0.0.0",
      port: 8080,
      livereload: true
    }));
});

// gulp.task("bower", function() {
//     return bower({
//       directory: config.bower.main
//     })
//     .pipe(gulp.dest(config.bower.output));
// });


gulp.task("build:css", function() {
  gulp.src(config.style.main)
    .pipe(sass.sync().on("Error", sass.logError))
    .pipe(gulp.dest(config.style.output));
});

gulp.task("build:js", function() {
  return gulp.src([config.js.main, config.js.watch])
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ["es2015"]}))
    .pipe(concat("final.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.js.output));
});

gulp.task("build:html", function() {
    return gulp.src(config.jade.main)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(config.jade.output));
});

gulp.task("build:views", function() {
  return gulp.src(config.jade.lib)
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest(config.jade.outputLib))
});

gulp.task("watch", function() {
  gulp.watch(config.js.watch, ["build:js"]);
  gulp.watch(config.style.watch, ["build:css"]);
  gulp.watch(config.jade.watch, ["build:html"]);
  gulp.watch(config.jade.lib, ["build:views"]);
});

gulp.task("build", ["build:js", "build:css", "build:html", "build:views"]);

gulp.task("default", ["server", "watch", "build"]);
