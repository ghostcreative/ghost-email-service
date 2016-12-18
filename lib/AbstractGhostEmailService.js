'use strict';

const Promise = require('bluebird');

class AbstractGhostEmailService {
  
  constructor () {}

  /**
   * @param {string} templateName
   * @param {object} options
   * @param {string} options.toEmail
   * @param {string} options.toName
   * @param {string} options.fromEmail
   * @param {string} options.fromName
   * @param {string} options.subject
   * @param {object} options.substitutions
   * @return Promise
   */
  send (templateName, options) {
    return Promise.reject(new Error('Abstract method - must override'));
  }
}

module.exports = AbstractGhostEmailService;