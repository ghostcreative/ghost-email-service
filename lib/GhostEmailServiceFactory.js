'use strict';
const MailChimpServiceFactory = require('./mailchimp/mailchimpServiceFactory');
const SendgridServiceFactory = require('./sendgrid/sendgridServiceFactory');

class GhostEmailServiceFactory {
  
  /**
   * @name GhostEmailService_SendgridConfig
   * @type {Object}
   * @property {object} options
   * @property {String} options.processor
   * @property {String} options.sandboxMode
   * @property {String} options.sendgrid.secretKey
   * @property {String} options.sendgrid.templates
   * @property {String} options.sendgrid.sandboxMode
   */
  
  /**
   * @name GhostEmailService_MailChimpConfig
   * @type {Object}
   * @property {String} publishKey
   * @property {String} secretKey
   */
  
  /**
   * @name GhostEmailService_Config
   * @type {Object}
   * @property {'sendgrid'|'mailchimp'} processor - The payment processor
   * @property {GhostEmailService_SendgridConfig} sendgrid - sendGrid configuration
   * @property {GhostEmailService_MailChimpConfig} mailchimp - mailChimp configuration
   */
  
  /**
   * @param {GhostEmailService_Config} options
   * @return {SendgridService|MailChimpService}
   */
   constructor (options) {
    if (options.processor == 'sendgrid') return SendgridServiceFactory.create(options.sendgrid);
    else if (options.processor == 'mailchimp') return MailChimpServiceFactory.create(options.mailchimp);
    else throw new Error('GhostEmailService: Unknown payment processor.')
  }
  
}

module.exports = GhostEmailServiceFactory;