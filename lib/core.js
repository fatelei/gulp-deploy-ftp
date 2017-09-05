/**
 * Plugin core
 */

const gulpUtil = require('gulp-util');
const through2 = require('through2');
const util = require('util');

const FtpClient = require('./client')
const PLUGIN_NAME = 'gulp-deploy-ftp';

/**
 * @param {string} remotePath: Remote path
 * @param {string} host: Ftp server host
 * @param {int} port: Ftp server port
 * @param {string} user: Ftp login user
 * @param {string} pass: Ftp login password
 */
const gulpDeployFtp = (remotePath='', host='localhost', port=21, user='', pass='') => {
  if (!remotePath.length) {
    throw new Error(PLUGIN_NAME, 'remotePath must be setted')
  }

  return through2.obj(
    // Transform function.
    (file, enc, cb) => {
      if (!file.isBuffer() && !file.isStream()) {
        throw new gulpUtil.PluginError(PLUGIN_NAME, 'Unsupported file type');
      }

      remotePath = `${remotePath}/${file.basename}`
      let _cli = new FtpClient(remotePath, host, port, user, pass);

      _cli.upload(file.contents).then((rst) => {
        gutil.log(`${PLUGIN_NAME}:`, gutil.colors.green(rst));
        cb(null, file)
      }).catch((err) => {
        cb(new gutil.PluginError(PLUGIN_NAME, err));
      })
    }
  );
};

// Exporting the plugin main function
module.exports = gulpDeployFtp;
