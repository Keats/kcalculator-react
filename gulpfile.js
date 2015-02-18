var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var del = require("del");
//var tsfmt = require("typescript-formatter");
//var glob = require("glob");

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require("./webpack.config.js");


// CONFIG
var paths = {
  sass: "src/style/**/*.scss",
  scripts: "src/app/**/*.ts",
  index: "src/index.html"
};
var destination = "./build";
var devCompiler = webpack(webpackConfig);
var devServer;
var production = process.env.NODE_ENV === 'production';


// TASKS
gulp.task("sass", function() {
  return gulp
    .src(paths.sass)
    .pipe($.sass({style: "compressed", errLogToConsole: true}))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(destination));
});

gulp.task("ts-lint", function() {
  return gulp
    .src(paths.scripts)
    .pipe($.tslint())
    .pipe($.tslint.report('prose', {emitError: false}));
});

//gulp.task("tsfmt", function(callback) {
//  glob(paths.scripts, function(err, files) {
//    tsfmt.processFiles(files, {
//      editorconfig: false,
//      replace: true,
//      tsfmt: false,
//      tslint: true
//    });
//    callback();
//  });
//});

gulp.task("clean", function(callback) {
  del([destination], callback);
});

gulp.task("index", function() {
  return gulp
    .src(paths.index)
    .pipe(gulp.dest(destination));
});

gulp.task("webpack:build", function(callback) {
  devCompiler.run(function (err, stats) {
    if (err) {
      throw new $.util.PluginError("webpack:build", err);
    }
    $.util.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack:dev-server", function (callback) {
  devServer = new webpackDevServer(devCompiler, {
    contentBase: destination,
    hot: true,
    watchDelay: 100,
    noInfo: true
  });

  devServer.listen(8080, "127.0.0.1", function(err) {
    if (err) {
      throw new $.util.PluginError("webpack:dev-server", err);
    }
    $.util.log("Server running on http://localhost:8080");
    callback();
  });
});

// Watch the things we are taking care of in gulp: sass, ts linting and index
gulp.task("gulp-watch", function() {
  gulp.watch(paths.sass, "sass");
  gulp.watch(paths.scripts, "ts-lint");
  gulp.watch(paths.index, "index");
});

// The tasks we will actually use 99.9% of the time
gulp.task(
  "watch",
  gulp.series("clean", "sass", "ts-lint", "index", "webpack:dev-server", "gulp-watch")
);

gulp.task(
  "build",
  gulp.series("clean", gulp.parallel("sass", "ts-lint", "index", "webpack:build"))
);
