const Chai = require('chai');
const expect = Chai.expect;
const Config = require('config');

const GhostEmailService = require('../index');

describe('GhostEmailService', function () {
  this.timeout(0);

  before(() => {
    return emailService = new GhostEmailService({
      processor: 'sendgrid',
      sendgrid: Config.get('email.sendgrid')
    })
  });

  describe('send', () => {

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

});