'use strict';

const MailChimpService = require('./mailchimpService');

class MailChimpServiceFactory {
  
  /**
   * @param {GhostEmailService_MailChimpConfig} options
   * @return {MailChimpService}
   */
  static create (options = {}) {
    return new MailChimpService(options);
  }
  
}

module.exports = MailChimpServiceFactory;