const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');

const GhostEmailService = require('../index');

describe('GhostEmailService', function () {
  this.timeout(0);

  describe('sendgrid', () => {

    before(() => {
      return emailService = new GhostEmailService({
        processor: 'sendgrid',
        sendgrid: Config.get('sendgrid.email.sendgrid')
      })
    });

    it('should send a welcome email', (done) => {
      emailService.send('welcome', {
        fromEmail: 'noreply@domain.com',
        fromName: 'The Ghost Team',
        toEmail: 'noreply@domain.com',
        toName: 'Test User',
        subject: 'Test Email',
        substitutions: {
          url: 'http://test.com',
          name: 'Test User'
        }
      })
      .then(res => {
        expect(res.statusCode).to.equal(202);
        done();
      })
      .catch(err => done(err));
    });

    it('should send a welcome email without substitutions', (done) => {
      emailService.send('welcome', {
        fromEmail: 'noreply@domain.com',
        fromName: 'The Ghost Team',
        toEmail: 'noreply@domain.com',
        toName: 'Test User',
        subject: 'Test Email No Subs'
      })
      .then(res => {
        expect(res.statusCode).to.equal(202);
        done();
      })
      .catch(err => done(err));
    });
  });

  describe('mailchimp', () => {

    before(() => {
      return emailServiceMailChimp = new GhostEmailService({
        processor: 'mailchimp',
        mailchimp: Config.get('mailchimp.email.mailchimp')
      })
    });

    it('should send a welcome email', (done) => {
      emailServiceMailChimp.send('welcome', {
        fromEmail: 'noreply@domain.com',
        fromName: 'The Ghost Team',
        toEmail: 'noreply@domain.com',
        toName: 'Test User',
        replyTo: 'noreply@domain.com',
        subject: 'Test Email',
        globalMergeVars: {
          url: 'http://test.com',
          name: 'Test User'
        }
      })
      .then(res => {
        expect(res[0].status).to.equal("sent");
        done();
      })
      .catch(err => done(err));
    });

    it('should send a welcome email without substitutions', (done) => {
      emailServiceMailChimp.send('welcome_user', {
        fromEmail: 'noreply@domain.com',
        fromName: 'The Ghost Team',
        toEmail: 'noreply@domain.com',
        toName: 'Test User',
        replyTo: 'noreply@domain.com',
        subject: 'Test Email No Vars'
      })
      .then(res => {
        expect(res[0].status).to.equal("sent");
        done();
      })
      .catch(err => done(err));
    });
  });
});