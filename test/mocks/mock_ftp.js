/**
 * Mock Ftp
 */

var events = require('events');
var util = require('util');

var files = {};

function MockFtp() {
  events.EventEmitter.call(this);
}

util.inherits(MockFtp, events.EventEmitter);

MockFtp.prototype.connect = function (options) {
  // Do nothing.
};

MockFtp.prototype.put = function (input, path, zcomp, cb) {
  files[path] =  new File({
    cnntent: input
  });
};

MockFtp.prototype.get = function (path, cb) {
  console.log(files);
  cb(null, files[path]);
};

module.exports = MockFtp;
