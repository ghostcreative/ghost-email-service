'use strict';

const Promise = require('bluebird');
const mandrill = require('mandrill-api/mandrill');

const AbstractGhostEmailService = require('../AbstractGhostEmailService');

class MailChimpService extends AbstractGhostEmailService {

  /**
   * https://mandrillapp.com/api/docs/templates.nodejs.html
   */

  /**
   * @constructor
   * @param {GhostEmailService_SendgridConfig} options
   */
  constructor (options) {
    super();
    this.mandrill_client = new mandrill.Mandrill(options.mandrill);
    this.mailchimpKey = options.secretKey;
    this.defaults = options.defaults;
  }

  /**
   * @param {string} code
   * @return Boolean
   */
  isValidErrorCode (code) {
    return this._errorCodes.indexOf(code) >= 0;
  }

  /**
   * @param {string} templateName
   * @param {object} data
   * @param {string} data.toEmail
   * @param {string} data.toName
   * @param {string} data.subject
   * @param {string} data.fromEmail
   * @param {string} data.fromName
   * @param {string} data.replyTo
   * @param {object} data.globalMergeVars
   * @return Promise
   */
  send (templateName, data) {
    let sendTemplate = {},
        templateContent = {},
        message = {};

    // templateContent
    templateContent = this._handleTemplateContent();

    // message
    message = this._handleMessage(data);

    sendTemplate = {
      "key": this.mailchimpKey,
      "template_name": templateName,
      "template_content": templateContent,
      "message": message
    };

    return this._send(sendTemplate);
  }

  _send (toSend) {
    return new Promise((resolve, reject) => {
      this.mandrill_client.messages.sendTemplate(toSend, function (response, error) {
        if (error) reject(error);
        else resolve(response);
      })
    })
  }

  // TODO
  //_handleAttachments(mail, data) {}

  _handleMessage (data) {
    let message = {},
        globalMergeVars = [];
    message = {
      "subject": data.subject,
      "from_email": this.defaults.fromEmail || data.fromEmail,
      "from_name": this.defaults.fromName || data.fromName || "",
      "to": [{
        "email": data.toEmail,
        "name": data.toName || "",
        "type": "to"
      }],
      "headers": {
        "Reply-To": this.defaults.replyTo || data.replyTo
      },
      "merge_language": "handlebars"
    };

    if (data.globalMergeVars) {
      globalMergeVars = this._handleGlobalMergeVars(data.globalMergeVars);
      message["global_merge_vars"] = globalMergeVars;
    }

    return message;
  }

  _handleGlobalMergeVars (data) {
    let globalMergeVars = [];
    for (let key in data) {
      globalMergeVars.push(
          {
            "name": key,
            "content": data[key]
          }
      );
    }
    return globalMergeVars;
  }

  _handleTemplateContent () {
    let templateContent = [{
      "name": "Template Name",
      "content": "MailChimp Not Harambe"
    }];
    return templateContent;
  }
}

module.exports = MailChimpService;