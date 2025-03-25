require('dotenv').config();
const admin = require("firebase-admin");

console.log("FIREBASE_ADMIN_KEY:", process.env.FIREBASE_ADMIN_KEY ? "Loaded" : "Not Loaded");

if (!process.env.FIREBASE_ADMIN_KEY) {
    throw new Error("FIREBASE_ADMIN_KEY is not defined in the .env file!");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
