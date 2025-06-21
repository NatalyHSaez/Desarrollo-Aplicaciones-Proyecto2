const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();

// 📧 Configura variables de entorno en tu entorno local (.env) o en Vercel
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// 📨 Función para enviar correo de registro
exports.sendRegistrationEmail = functions.https.onCall(async (data, context) => {
  console.log("Datos recibidos para correo:", data);
  const { email, rut, password } = data;

  if (!email || !rut || !password) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Faltan datos para enviar el correo"
    );
  }

  const mailOptions = {
    from: `"AccessPro" <${EMAIL_USER}>`,
    to: email,
    subject: "Registro Exitoso",
    text: `Bienvenido a AccessPro.\n\nTu RUT: ${rut}\nTu contraseña: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw new functions.https.HttpsError("internal", "Error al enviar correo");
  }
});

// 🔐 Función para verificar inicio de sesión (RUT y clave desde Firestore)
exports.verificarUsuario = functions.https.onCall(async (data, context) => {
  const { rut, clave } = data;
  console.log('Enviando:', { rut, password });

  if (!rut || !clave) {
    throw new functions.https.HttpsError("invalid-argument", "Faltan datos");
  }

  try {
    const snapshot = await db
      .collection("usuarios")
      .where("rut", "==", rut)
      .limit(1)
      .get();

    if (snapshot.empty) {
      throw new functions.https.HttpsError("not-found", "Usuario no registrado");
    }

    const userData = snapshot.docs[0].data();

    if (userData.clave !== clave) {
      throw new functions.https.HttpsError("unauthenticated", "Contraseña incorrecta");
    }

    return { success: true, nombre: userData.nombre || "", rut: userData.rut };
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    throw new functions.https.HttpsError("internal", "Error interno");
  }
});
