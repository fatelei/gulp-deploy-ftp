/* Ftp client. */

const JSFtp = require('jsftp');


class FtpClient {
  constructor(remotePath, host='localhost', port=21, user='', pass='') {
    this.remotePath = remotePath;
    this._cli = new JSFtp({
      host: host,
      port: port,
      user: user,
      pass: pass
    });
  }

  /**
   * @param {object} file
   * @return a promise
   */
  upload(content) {
    return new Promise((resolve, reject) => {
      this._cli.put(content, this.remotePath, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(`upload to ${this.remotePath} successfully`)
        }
      })
    })
  }
}

module.exports = FtpClient;
