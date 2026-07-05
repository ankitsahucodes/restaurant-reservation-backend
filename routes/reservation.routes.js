const express = require("express");
const router = express.Router();

const {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
  getReservationsByDate,
  adminCancelReservation,
} = require("../controllers/reservation.controller");

const verifyUser = require("../middlewares/verifyUser");
const verifyAdmin = require("../middlewares/verifyAdmin");

// Customer routes
router.post("/", verifyUser, createReservation);
router.get("/my", verifyUser, getMyReservations);
router.put("/:id", verifyUser, cancelReservation);

// Admin routes
router.get("/", verifyUser, verifyAdmin, getAllReservations);
router.get("/date/:date", verifyUser, verifyAdmin, getReservationsByDate);
router.put("/admin/:id", verifyUser, verifyAdmin, adminCancelReservation);

module.exports = router;
