'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const AWS = require('aws-sdk');
const ses = AWS.SES;

const AbstractGhostEmailService = require('../AbstractGhostEmailService');

class SESService extends AbstractGhostEmailService {

  /**
   * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html
   */

  /**
   * @constructor
   * @param {GhostEmailService_sesConfig} options
   * @param {String} options.endpoint - SES Endpoint
   * @param {String} options.accessKeyId - AWS Access Key
   * @param {String} options.secretAccessKey - AWS Secret Key
   * @param {String} options.region - AWS region
   */
  constructor (options) {
    super();
    console.log('configuring options', options);
    this._ses = new ses(options);
  }

  /**
   * @param {String} templateId
   * @param {Object} data
   */
  send (templateName, data) {
    // TO DO - implement this
    return true;
  }

  /**
   * @param {Object} data
   * @param {String[]} data.ToAddresses
   * @param {String[]} [data.CcAddresses]
   * @param {String[]} [data.BccAddresses]
   * @param {String} data.body - the email body (html)
   * @param {String} data.subject
   * @param {String} data.source - the sender of the email (must be verified via AWS)
   * @return Promise
   */
  sendTemplate (data) {
    return new Promise((resolve, reject) => {
      this._ses.sendEmail({
        Destination: _.pick(data, ['ToAddresses, CcAddresses, BccAddresses']),
        Source: data.source,
        Message: {
          Subject: {
            Charset: 'UTF-8',
            Data: data.subject
          },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: data.body
            }
          }
        }
      }, (err, data) => {
        console.log('callback', err, data);
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

}

module.exports = SESService;