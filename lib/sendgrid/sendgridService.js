'use strict';

const Promise = require('bluebird');
const Helper = require('sendgrid').mail;

const AbstractGhostEmailService = require('../AbstractGhostEmailService');

class SendgridService extends AbstractGhostEmailService {

  /**
   * https://github.com/sendgrid/sendgrid-nodejs/blob/master/examples/helpers/mail/example.js#L15
   */

  /**
   * @constructor
   * @param {GhostEmailService_SendgridConfig} options
   */
  constructor (options) {
    super();
    this._sendgrid = require('sendgrid')(options.secretKey);
    this._sandboxMode = options.sandboxMode;
    this._templateDir = options.templates;
  }

  /**
   * @param {string} code
   * @return Boolean
   */
  isValidErrorCode (code) {
    return this._errorCodes.indexOf(code) >= 0;
  }

  /**
   * @param {string} templateId
   * @param {object} data
   * @param {string} data.toEmail
   * @param {string} data.toName
   * @param {string} data.subject
   * @param {string} data.fromEmail
   * @param {string} data.fromName
   * @param {object} data.substitutes
   * @param {object} data.headers
   * @return Promise
   */
  send (templateName, data) {
    const fromEmail = new Helper.Email(data.fromEmail, data.fromName);
    const toEmail = new Helper.Email(data.toEmail, data.toName);
    const subject = data.subject;
    const content = new Helper.Content("text/html", '<span></span>');
    const mail = new Helper.Mail(fromEmail, subject, toEmail, content);

    const templateId = this._templateDir[templateName];

    mail.setTemplateId(templateId);


    // attachment
    //
    // TODO
    // this._handleAttachments(mail, data)

    // settings
    this._handleSettings(mail);

    // substitutions
    this._handleSubstitutions(mail, data);

    // header
    this._handleHeaders(mail, data);

    return this._send(mail.toJSON());
  }

  _send (toSend) {
    var requestBody = toSend;
    var emptyRequest = require('sendgrid-rest').request;
    var requestPost = JSON.parse(JSON.stringify(emptyRequest));
    requestPost.method = 'POST';
    requestPost.path = '/v3/mail/send';
    requestPost.body = requestBody;
    return new Promise((resolve, reject) => {
      this._sendgrid.API(requestPost, function (error, response) {
        if (error) reject(error);
        else resolve(response);
      })
    })
  }

  // TODO
  //_handleAttachments(mail, data) {}

  _handleHeaders (mail, data) {
    if (typeof data.headers == 'object') {
      for (let key of data.headers) {
        const header = new Helper.Header(key, data.headers[key]);
        mail.addHeader(header)
      }
    }
  }

  _handleSubstitutions (mail, data) {
    if (typeof data.substitutions === 'object') {
      for (let key in data.substitutions) {
        const substitution = new Helper.Substitution(`-${key}-`, data.substitutions[key]);
        mail.personalizations[0].addSubstitution(substitution);
      }
    }
  }

  _handleSettings (mail) {
    const settings = new Helper.MailSettings();
    settings.setSandBoxMode(new Helper.SandBoxMode(this._sandboxMode));
    mail.addMailSettings(settings)
  }

}

module.exports = SendgridService;