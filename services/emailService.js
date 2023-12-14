const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ivancodespace@gmail.com',
    pass: 'leaz kksn lbfn qlpl',
  },
});


const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'ivancodespace@gmail.com',
      to: to,
      subject: subject, 
      html: `<b>${text}</b>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = { sendEmail };
