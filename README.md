# gulp-deploy-ftp

![Build Status](https://travis-ci.org/fatelei/gulp-deploy-ftp.svg?branch=master)

Upload file(s) through ftp

## Install
```
npm install --save-dev gulp-deploy-ftp
```

## Usage
```
var gulp = require('gulp');
var gulpDeployFtp = require('gulp-deploy-ftp');

var options = {
  user: username,
  password: password,
  port: ftp server port,
  host: ftp server host,
  uploadPath: target path
};

gulp.src('path/to/file')
  .pipe(gulpDeployFtp(options))
  .pipe(gulp.dest('dest'));
```
