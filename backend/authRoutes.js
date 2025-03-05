const express = require("express");
const admin = require("./firebaseAdmin");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

router.post("/signin", async (req, res) => {
    const { email } = req.body;
  
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      res.json({ message: "User exists", user: userRecord });
    } catch (error) {
      res.status(400).json({ error: "User not found" });
    }
  });
  