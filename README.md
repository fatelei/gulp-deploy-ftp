# gulp-deploy-ftp

[![Build Status](https://travis-ci.org/fatelei/gulp-deploy-ftp.svg?branch=master)](https://travis-ci.org/fatelei/gulp-deploy-ftp)

Upload file through ftp

## Install

```Shell
npm install --save-dev gulp-deploy-ftp
```

## Usage

```JavaScript
const gulp = require('gulp');
const gulpDeployFtp = require('gulp-deploy-ftp');

gulp.src('path/to/file')
  .pipe(gulpDeployFtp({
    remotePath: '/tmp',
    host: 'localhost',
    port: 21,
    user: 'foo',
    pass: 'bar'
  })
  .pipe(gulp.dest('dest'));
```
