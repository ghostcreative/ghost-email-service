'use strict';
const MailChimpServiceFactory = require('./mailchimp/mailchimpServiceFactory');
const SendgridServiceFactory = require('./sendgrid/sendgridServiceFactory');
const SesServiceFactory = require('./ses/sesServiceFactory');

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
   * @typedef GhostEmailService_sesConfig
   * @type {Object}
   * @param {String} GhostEmailService_sesConfig.endpoint - SES Endpoint
   * @param {String} GhostEmailService_sesConfig.accessKeyId - AWS Access Key
   * @param {String} GhostEmailService_sesConfig.secretAccessKey - AWS Secret Key
   * @param {String} GhostEmailService_sesConfig.region - AWS region
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
   * @return {SendgridService|MailChimpService|sesService}
   */
   constructor (options) {
    if (options.processor === 'sendgrid') return SendgridServiceFactory.create(options.sendgrid);
    else if (options.processor === 'mailchimp') return MailChimpServiceFactory.create(options.mailchimp);
    else if (options.processor === 'ses') return SesServiceFactory.create(options.ses);
    else throw new Error('Unsupported email service.')
  }
  
}

module.exports = GhostEmailServiceFactory;