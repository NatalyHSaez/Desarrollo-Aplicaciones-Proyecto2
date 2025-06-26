const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { authenticator } = require("otplib");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");

admin.initializeApp();

const db = admin.database(); // Para Realtime Database

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mackahuaiquinao@gmail.com',
    pass: 'orfr xieo jugr ebhv' // Usa contraseña de aplicación
  }
});

exports.sendRegistrationEmail = functions.https.onCall(async (data, context) => {
  const { email, rut, password, uid } = data;

  if (!email || !rut || !password || !uid) {
    throw new functions.https.HttpsError("invalid-argument", "Faltan datos");
  }

  try {
    // 1. Generar secreto TOTP para MFA
    const secret = authenticator.generateSecret();

    // 2. Generar URL OTPAuth (para QR)
    const otpauth = authenticator.keyuri(email, 'TuAppNombre', secret);

    // 3. Generar QR en base64
    const qrCodeDataUrl = await QRCode.toDataURL(otpauth);

    // 4. Guardar secreto y QR en Realtime Database usando UID directamente
    await db.ref(`usuarios/${uid}/mfa`).set({
      totpSecret: secret,
      qrCode: qrCodeDataUrl,
      createdAt: admin.database.ServerValue.TIMESTAMP
    });

    // 5. Enviar correo con QR embebido en HTML
    const mailOptions = {
      from: 'mackahuaiquinao@gmail.com',
      to: email,
      subject: 'Bienvenido a TuApp - Configura tu autenticación multifactor',
      html: `
        <p>Hola,</p>
        <p>Gracias por registrarte en TuApp.</p>
        <p>Para activar la autenticación multifactor, escanea este código QR con tu app autenticadora (Google Authenticator, Authy, etc):</p>
        <img src="${qrCodeDataUrl}" alt="Código QR para MFA" />
        <p>Si tienes dudas, contacta con soporte.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return { success: true };

  } catch (error) {
    console.error('Error en sendRegistrationEmail:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
