'use strict';

const SendgridService = require('./sendgridService');

class SendgridServiceFactory {
  
  /**
   * @param {GhostEmailService_SendgridConfig} options
   * @return {SendgridService}
   */
  static create (options = {}) {
    return new SendgridService(options);
  }
  
}

module.exports = SendgridServiceFactory;