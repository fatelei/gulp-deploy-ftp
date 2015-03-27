/**
 * Plugin core
 */

var Ftp = require('ftp');
var gulpUtil = require('gulp-util');
var through2 = require('through2');
var util = require('util');

const PLUGIN_NAME = 'gulp-deploy-ftp';

function gulpDeployFtp (options) {
  var connectOpts = {
    host: options.host || 'localhost', 
    port: options.port || 21
  };

  var basePath = options.uploadPath === undefined ? '' : options.uploadPath;

  if (options.hasOwnProperty('user')) {
    connectOpts.user = options.user;
  }

  if (options.hasOwnProperty('password')) {
    connectOpts.password = options.password;
  }

  //client.connect({user: 'zhstatic', password: 'zhstatic', port: 21, host:'zhstatic.in.zhihu.com'}s);

  return through2.obj(function (file, enc, cb) {
    if (!file.isBuffer() && !file.isStream()) {
      throw new gulpUtil.PluginError(PLUGIN_NAME, 'Unsupported file type');
    }

    var filename = file.path.split('/').slice(-1)[0];
    var destPath = null;

    if (basePath.length > 0) {
      destPath = basePath + '/' + filename;
    } else {
      destPath = filename;
    }

    var client = new Ftp();

    client.once('error', function (err) {
      throw new gulpUtil.PluginError(PLUGIN_NAME, err);
    });

    client.once('ready', function () {
      client.put(file.contents, destPath, function (err) {
        if (err) {
          throw new gulpUtil.PluginError(PLUGIN_NAME, err);
        }
        client.end();
      });

      cb(null, file);
    });

    client.connect(connectOpts);
  });
};

// Exporting the plugin main function
module.exports = gulpDeployFtp;

