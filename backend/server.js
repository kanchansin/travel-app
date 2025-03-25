require('dotenv').config();

const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const fetch = require('node-fetch');

const serviceAccount = require("./firebaseAdminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

const router = express.Router();
app.use(router);

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

router.get("/places", async (req, res) => {
    const query = req.query.input;
  
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }
  
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.features) {
        const places = data.features.map((place) => ({
          name: place.text,
          coordinates: place.center,
        }));
        return res.json({ predictions: places });
      } else {
        return res.status(500).json({ error: "No results found" });
      }
    } catch (error) {
      console.error("Error fetching Mapbox places:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/login', async (req, res) => {
    const { idToken } = req.body;

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
