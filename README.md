# Ghost Email Service

## Installation

`npm install ghost-email-service --save`

## Overview

### Config (default listed below)
MailChimp is not currently supported
Provide sendgrid secret key + template names and the associated ID's

```json
{
  "email": {
    "processor": "sendgrid",
    "sendgrid": {
      "secretKey": "[sendgrid secret key]",
      "templates": {
        "templateName": "[templateId]"
      },
      "sandboxMode": true
    }
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

### Models
The module will attempt to load the mail send services provided in the config object
assuming a valid secret key and template id's, along with the sandbox setting.
All templates will be available via the `send(templateName, obj)`
method. See examples below.

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

```js
EmailService.send('templateName',obj)
.then(result => { ... })
.catch(err => { ... });
// The templateName should reference a template name associated to a valid
// templateId within the initial config object.
// See obj above
```