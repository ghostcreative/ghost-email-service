'use strict';

const sesService = require('./sesService');

class sesServiceFactory {

  /**
   * @param {GhostEmailService_SESConfig} options
   * @return {sesService}
   */
  static create (options = {}) {
    return new sesService(options);
  }

}

module.exports = sesServiceFactory;