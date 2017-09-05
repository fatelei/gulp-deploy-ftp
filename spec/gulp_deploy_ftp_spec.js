/* Test gulp-deploy-ftp */

const FtpClient = require('../lib/client')
const Vinyl = require('vinyl');
const gulpDeployFtp = require('../index');

describe('Test gulp-deploy-ftp', () => {
  let _cli;
  let fakeFile;
  beforeEach(() => {
    fakeFile = new Vinyl({
      cwd: '/',
      base: '/test/',
      path: '/test/file.js',
      contents: new Buffer('var x = 123')
    });
  });

  describe('Test remotePath is empty', () => {
    it('should raise an exception', () => {
      expect(gulpDeployFtp).toThrowError(Error);
    });
  });

  describe('Test upload file via ftp', () => {
    it('should upload successfully', () => {
      gulpDeployFtp('/upload/test', 'speedtest.tele2.net').write(fakeFile)
    });
  });
});
