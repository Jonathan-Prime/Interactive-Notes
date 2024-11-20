import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export interface OptionsMailer {
  to: string;
  subject: string;
  text: string;
}

const sendEmail = async (options: OptionsMailer) => {
  try {
    const transporter = nodemailer.createTransport(
      sgTransport({
        auth: {
          api_key: process.env.SENDGRID_API_KEY,
        },
      })
    );

    const mailOptions = {
      from: "",
      to: options.to,
      subject: options.subject,
      html: options.text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};

export default sendEmail;
