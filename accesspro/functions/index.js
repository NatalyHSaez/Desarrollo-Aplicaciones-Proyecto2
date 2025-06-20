const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Variables de entorno (configúralas con Firebase CLI)
const EMAIL_USER = functions.config().email.user;
const EMAIL_PASS = functions.config().email.pass;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

exports.sendRegistrationEmail = functions.https.onCall(async (data, context) => {
  const { email, rut, password } = data;

  if (!email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "El campo email es obligatorio"
    );
  }

  const mailOptions = {
    from: `"AccessPro" <${EMAIL_USER}>`,
    to: email,
    subject: "Registro Exitoso",
    text: `Bienvenido a AccessPro. Tu RUT: ${rut} y tu contraseña es: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error al enviar correo"
    );
  }
});
