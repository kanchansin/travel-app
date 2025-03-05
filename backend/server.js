require('dotenv').config(); // ✅ Load environment variables first

const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const fetch = require('node-fetch'); // ✅ Import fetch for API calls

const serviceAccount = require("./firebaseAdminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // ✅ Allows JSON parsing in requests

// ✅ Test Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// ✅ Google Places API Route
app.get('/places', async (req, res) => {
    const input = req.query.input;
    const GOOGLE_API_KEY = process.env.GOOGLE_MAP_KEY;

    if (!input) {
        return res.status(400).json({ error: 'Missing input parameter' });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}&components=country:IN`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch places' });
    }
});

// ✅ Firebase Login Route
app.post('/api/login', async (req, res) => {
    const { idToken } = req.body; // Get token from frontend

    if (!idToken) {
        return res.status(400).json({ success: false, message: "ID token is required" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        res.json({ success: true, userId: decodedToken.uid });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid Token", error: error.message });
    }
});

// ✅ Start Server AFTER all routes are defined
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
