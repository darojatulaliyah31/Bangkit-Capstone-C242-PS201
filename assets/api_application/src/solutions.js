const express = require("express");
const admin = require("firebase-admin");
const solutionRouter = express.Router();

module.exports = (db) => {
    const solutionCollection = db.collection("problemSolution");

    // Endpoint API untuk mengambil semua solusi
    solutionRouter.get("/", async (req, res) => {
        try {
            const solutionSnapshot = await solutionCollection.get();

            if (solutionSnapshot.empty) {
                return res.status(404).json({
                    status: "error",
                    message: "No solution found.",
                });
            } else {
                const solutionData = []; // Initialize an array to hold the solutions

                solutionSnapshot.forEach((doc) => {
                    solutionData.push({ id: doc.id, ...doc.data() }); // Push the document data with ID
                });

                return res.status(200).json({
                    status: "success",
                    solutions: solutionData, // Return the solutions array
                });
            }
        } catch (error) {
            console.error("Error retrieving solutions:", error); // Log the error
            return res.status(500).json({
                status: "error",
                message: "Failed to retrieve solutions.",
            });
        }
    });

    // Endpoint untuk mengambil data solusi berdasarkan ID
    solutionRouter.get("/:idSolution", async (req, res) => {
      try {
          const { idSolution } = req.params;

          const solutionDoc = await solutionCollection.doc(idSolution).get();

          if (!solutionDoc.exists) {
              return res.status(404).json({
                  status: "error",
                  message: "Solution not found.",
              });
          } else {
              const solutionData = solutionDoc.data();

              return res.status(200).json({
                  status: "success",
                  solutionData,
              });
          }
      } catch (error) {
          console.error("Error retrieving solution by ID:", error); // Log the error for debugging
          return res.status(500).json({
              status: "error",
              message: "Failed to retrieve solution.",
          });
      }
  });

  return solutionRouter; // Ensure you return the router
};