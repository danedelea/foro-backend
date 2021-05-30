const nodemailer = require('nodemailer');

module.exports = {
    transporter: nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
          user: 'help.people.finder@gmail.com',
          pass: 'hqbfxueelrgtfuvn'
        }
      })
};