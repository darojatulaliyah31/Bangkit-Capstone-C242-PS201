const express = require("express");
const admin = require("firebase-admin");

module.exports = (io) => {
  const router = express.Router();

  // Firestore DB
  const db = admin.firestore();

  // Fungsi untuk menghitung jarak antara dua titik geografis menggunakan rumus Haversine
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius bumi dalam kilometer
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Jarak dalam kilometer
  }

  // Fungsi untuk mendapatkan rekomendasi tempat servis
  async function getRecommendations(latitude, longitude) {
    const tempatServis = [];
    try {
      // Mengambil semua dokumen dari koleksi "service-place"
      const snapshot = await db.collection("service-place").get();

      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const distance = calculateDistance(
            latitude,
            longitude,
            data.location.latitude,
            data.location.longitude
          );

          tempatServis.push({
            id: doc.id,
            description: data.description,
            image: data.image,
            location: {
              _latitude: data.location.latitude,
              _longitude: data.location.longitude,
            },
            rating: data.rating,
            review: data.review,
            distance: distance, // Tambahkan jarak ke data tempat servis
          });
        });

        // Urutkan tempat servis berdasarkan jarak terdekat
        tempatServis.sort((a, b) => a.distance - b.distance);
      }
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }

    // Mengembalikan maksimal 3 tempat servis terdekat
    return tempatServis.slice(0, 3);
  }

  // Route GET untuk rekomendasi
  router.get("/", async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    try {
      const recommendations = await getRecommendations(parseFloat(latitude), parseFloat(longitude));

      // Format respons sesuai contoh yang diminta
      const formattedResponse = {
        recommendations: recommendations.map((item) => ({
          id: item.id,
          description: item.description,
          image: item.image,
          location: {
            _latitude: item.location._latitude,
            _longitude: item.location._longitude,
          },
          rating: item.rating,
          review: item.review,
          distance: item.distance,
        })),
      };

      // Emit event ke klien melalui Socket.IO
      io.emit("recommendations_fetched", formattedResponse);

      res.status(200).json(formattedResponse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route POST untuk rekomendasi
  router.post("/", async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    try {
      const recommendations = await getRecommendations(parseFloat(latitude), parseFloat(longitude));

      // Format respons sesuai contoh yang diminta
      const formattedResponse = {
        recommendations: recommendations.map((item) => ({
          id: item.id,
          description: item.description,
          image: item.image,
          location: {
            _latitude: item.location._latitude,
            _longitude: item.location._longitude,
          },
          rating: item.rating,
          review: item.review,
          distance: item.distance,
        })),
      };

      // Emit event ke klien melalui Socket.IO
      io.emit("recommendations_fetched", formattedResponse);

      res.status(200).json(formattedResponse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
