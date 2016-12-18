'use strict';
// TODO: Setup MailChimp
// const MailchimpServiceFactory = require('./mailchimp/mailchimpServiceFactory');
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
   * @name GhostPaymentService_Config
   * @type {Object}
   * @property {'sendgrid'|'mailchimp'} processor - The payment processor
   * @property {GhostEmailService_SendgridConfig} sendgrid - sendGrid configuration
   * @property {GhostEmailService_MailChimpConfig} mailchimp - mailChimp configuration
   */
  
  /**
   * @param {GhostPaymentService_Config} options
   * @return {SendgridService|AuthorizeNetService}
   */
   constructor (options) {
    if (options.processor == 'sendgrid') return SendgridServiceFactory.create(options.sendgrid);
    //  TODO Setup MailChimp!!
    // else if (options.processor == 'mailchimp') return MailChimpServiceFactory.create(options.mailchimp);
    else throw new Error('GhostEmailService: Unknown payment processor.')
  }
  
}

module.exports = GhostEmailServiceFactory;