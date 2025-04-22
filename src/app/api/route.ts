import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, phone, subject, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail', // o el proveedor que uses (SendGrid, Mailgun, etc.)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Nuevo mensaje de contacto: ${subject}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Teléfono: ${phone}
      Asunto: ${subject}
      Mensaje: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
