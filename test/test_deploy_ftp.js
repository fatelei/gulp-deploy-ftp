/**
 * Test gulp-deploy-ftp
 */



var File = require('vinyl');
var assert = require('assert');
var es = require('event-stream');
var mock = require('mockery');

var MockFtp = require('./mocks/mock_ftp');
var gulpDeployFtp = require('../index');

mock.registerMock('ftp', MockFtp);

var options = {
  user: 'test',
  password: 'test',
  filename: '000',
  port: 12345,
  host: 'localhost'
};


describe('Test gulp-deploy-ftp', function () {
  before(function () {
    mock.enable();
  });
  describe('in stream mode', function () {
    it('should be ok', function (done) {
      var file = new File({
        path: options.filename,
        contents: es.readArray(['hello world'])
      });

      gulpDeployFtp(options).write(file);
      done();
    });
  });
  describe('in buffer mode', function () {
    it('should be ok', function (done) {
      var file = new File({
        path: options.filename,
        contents: new Buffer('hello world')
      });

      gulpDeployFtp(options).write(file);
      done();
    });
  });
  after(function () {
    mock.disable();
  });
});