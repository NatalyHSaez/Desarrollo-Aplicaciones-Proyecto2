const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

exports.createUserAdmin = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email, password } = req.body;
      const userRecord = await admin.auth().createUser({ email, password });
      res.status(200).json({ uid: userRecord.uid });
    } catch (error) {
      console.error("Error creando usuario:", error);
      res.status(500).send(error.message);
    }
  });
});
