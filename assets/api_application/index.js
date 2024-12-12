require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Inisialisasi Firebase Admin hanya jika belum diinisialisasi
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Firestore instance
const db = admin.firestore(); // Firestore DB instance

// Import routers
const usersRouter = require("./src/users");
const favoriteRouter = require("./src/favorites");
const solutionRouter = require("./src/solutions");
const recommendationsRouter = require("./src/recommendations"); // Diubah untuk menerima io

// Setup aplikasi
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

// Middleware umum
app.use(cors());
app.use(bodyParser.json());

// Endpoint utama
app.get("/", (req, res) => {
  res.status(200).send("Service Recommendation API is Running 🚀");
});

// Gunakan routers dengan `db` dan `io` sebagai parameter
app.use("/api/users", usersRouter(db));
app.use("/api/favorites", favoriteRouter(db)); // Dilindungi autentikasi sesi
app.use("/api/solutions", solutionRouter(db)); // Dilindungi autentikasi sesi
app.use("/api/recommendations", recommendationsRouter(io)); // Pass io ke router

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Event listener untuk disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Middleware untuk 404 error
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Jalankan server
const PORT = process.env.PORT || 8080;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`⚡ Server is running on http://localhost:${PORT}`);
});
