const express = require("express");
const router = express.Router();

const {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
  getReservationsByDate,
  updateReservation,
  adminCancelReservation,
} = require("../controllers/reservation.controller");

const verifyUser = require("../middlewares/verifyUser");
const verifyAdmin = require("../middlewares/verifyAdmin");

// Customer
router.post("/", verifyUser, createReservation);
router.get("/my", verifyUser, getMyReservations);
router.delete("/:id", verifyUser, cancelReservation);

// Admin
router.get("/", verifyUser, verifyAdmin, getAllReservations);
router.get("/date/:date", verifyUser, verifyAdmin, getReservationsByDate);
router.put("/:id", verifyUser, verifyAdmin, updateReservation);
router.delete("/admin/:id", verifyUser, verifyAdmin, adminCancelReservation);

module.exports = router;