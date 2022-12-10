import nodemailer from "nodemailer";

interface SendEmailOption {
  email: string;
  html: any;
}

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail({ email, html }: SendEmailOption) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "qloctfn5xfjnvbhj@ethereal.email", // generated ethereal user
      pass: "vQmusSH2R8ma4dnTUm", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Kevin Nacario" <hitchcliff123@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot Password", // Subject line
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
