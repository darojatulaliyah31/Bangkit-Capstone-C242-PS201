const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const usersCollection = db.collection("users");

  // Sign Up User
  router.post("/signup", async (req, res) => {
    const { fullName, email, phoneNumber, password } = req.body;

    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const userDoc = await usersCollection.doc(email).get();
      if (userDoc.exists) {
        return res.status(400).json({ error: "User already exists" });
      }

      await usersCollection.doc(email).set({
        fullName,
        email,
        phoneNumber,
        password,
        favorites: [],
      });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Log In User with Email and Password
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const userDoc = await usersCollection.doc(email).get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = userDoc.data();
      if (user.password !== password) {
        return res.status(400).json({ error: "Invalid password" });
      }

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Sign In or Log In with Google
  router.post("/google-auth", async (req, res) => {
    const { email, fullName, phoneNumber } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({ error: "Email and full name are required" });
    }

    try {
      const userDoc = await usersCollection.doc(email).get();

      if (!userDoc.exists) {
        // Register user if not already exists
        await usersCollection.doc(email).set({
          fullName,
          email,
          phoneNumber: phoneNumber || "",
          password: "",
          favorites: [],
        });
      }

      res.status(200).json({ message: "User authenticated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
