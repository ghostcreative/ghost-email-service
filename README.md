# Ghost Email Service

## Installation

`npm install ghost-email-service --save`

## Overview

### Config (default listed below)
Provide sendgrid secret key + template names and the associated ID's

##### Sendgrid Config
```json
{
  "email": {
    "processor": "sendgrid",
    "sendgrid": {
      "secretKey": "[sendgrid secret key]",
      "templates": {
        "templateName": "[templateId]"
      },
      "sandboxMode": true,
      "defaults": {
        "fromEmail": "noreply@yourwebsite.com",
        "fromName": "Pablo Escobar",
        "replyTo": "contact@yourwebsite.com"
      }
    }
  }
}
```
##### MailChimp Config
```json
{
  "email": {
    "processor": "mailchimp",
    "mailchimp": {
      "secretKey": "[mailchimp api key]",
      "mandrill": "[mandrill api key]"
      }
    },
    "defaults": {
      "fromEmail": "noreply@yourwebsite.com",
      "fromName": "Justin Tucker",
      "replyTo": "contact@yourwebsite.com"
    }
}
```

### SendGrid Send obj config(default listed below)

```json
{
    "fromEmail": "noreply@domain.com",
    "fromName": "The Ghost Team",
    "toEmail": "noreply@domain.com",
    "toName": "Test User",
    "subject": "Test Email",
    "substitutions": {
      "url": "http://test.com",
      "name": "Test User"
    }
}
```
### MailChimp Send obj config(default listed below)

```json
{
    "fromEmail": "noreply@domain.com",
    "fromName": "The Ghost Team",
    "toEmail": "noreply@domain.com",
    "toName": "Test User",
    "replyTo": "noreply@domain.com",
    "subject": "Test Email",
    "globalMergeVars": {
      "url": "http://test.com",
      "name": "Test User"
    }
}
```

### Models
##### Sendgrid
The module will attempt to load the mail send services provided in the config object
assuming a valid secret key and template id's, along with the sandbox setting.
All templates will be available via the `send(templateName, obj)`
method. 
##### MailChimp
The module will attempt to load the mail send services provided in the config object
assuming a valid secret key and mandrill key.
All templates will be available via the `send(templateName, obj)`
method. 

See examples below.

Follow the steps below to get the module up and running.
 
### 1. Require 

```js
const GhostEmail = require('ghost-email-service');
```

### 2. Instantiate

```js
const EmailService = new GhostEmail(config)
// See config above
```

### 3. Send Email
##### Sendgrid
The template name should correspond to a template id within the config object
##### MailChimp
The template name should correspond to a template found within your mailchimp templates

```js
EmailService.send('templateName',obj)
.then(result => { ... })
.catch(err => { ... });
// See obj above
```