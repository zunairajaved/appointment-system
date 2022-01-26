const nodemailer = require('nodemailer');
module.exports = {
    'secretKey': '12345-67890-09876-54321',
   transporter : nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: 'email',
      pass: 'app password'
    }
    })
}