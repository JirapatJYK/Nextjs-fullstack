import { NextApiRequest, NextApiResponse } from "next";
var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.SUPPORT_MAIL,
    pass: process.env.SUPPORT_MAIL_PASSWORD
  }
});
var mailOptions = {
  from: process.env.SUPPORT_MAIL,
  to: '',
  subject: 'Reset Password',
  html: `<div>
            <h1>Username</h1>
            <p>Please click the link below to recover your Steam login credentials:</p>
            <a className="link" href="https://www.w3schools.com/nodejs/nodejs_email.asp">Reset password!</a>
          </div>`
};
var result= {
    status: '',
    token: ''
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { apiID } = await req.query;
    apiID == 'reset-password'
      ? result = await resetPassword(req.body.email)
      : ''
      res.status(200).json(result);
}

async function resetPassword(email: string){
  mailOptions.to = email;
    transporter.sendMail(mailOptions, function(error: any, info: any){
      if (error) {
        console.log(error);
        result.status = "Can't Send"
      } else {
        console.log('Email sent: ' + info.response);
        result.status = "send"
        result.token = jwt.sign( email , 'shhhhh')
      }
    });
    return result
}