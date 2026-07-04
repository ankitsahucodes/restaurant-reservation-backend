const Restaurant_Reservation = require("../models/reservation.model");
const Restaurant_Table = require("../models/table.model");

const createReservation = async (req, res) => {
  try {
    const { date, timeSlot, guests } = req.body;

    if (!date || !timeSlot || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Find suitable tables
    const tables = await Restaurant_Table.find({
      capacity: { $gte: guests },
    }).sort({ capacity: 1 });

    if (tables.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No table available for this number of guests",
      });
    }

    let assignedTable = null;

    // Find first available table
    for (const table of tables) {
      const existingReservation = await Restaurant_Reservation.findOne({
        table: table._id,
        date,
        timeSlot,
        status: "booked",
      });

      if (!existingReservation) {
        assignedTable = table;
        break;
      }
    }

    if (!assignedTable) {
      return res.status(400).json({
        success: false,
        message: "No table available for selected date and time slot",
      });
    }

    const reservation = await Restaurant_Reservation.create({
      user: req.user.id,
      table: assignedTable._id,
      date,
      timeSlot,
      guests,
    });

    await reservation.populate("table", "tableNumber capacity");

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyReservations = async (req, res) => {
  try {
    const reservations = await Restaurant_Reservation.find({
      user: req.user.id,
    })
      .populate("table", "tableNumber capacity")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const reservation = await Restaurant_Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    reservation.status = "cancelled";

    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Restaurant_Reservation.find()
      .populate("user", "name email")
      .populate("table", "tableNumber capacity")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReservationsByDate = async (req, res) => {
  try {
    const reservations = await Restaurant_Reservation.find({
      date: req.params.date,
    })
      .populate("user", "name email")
      .populate("table", "tableNumber capacity");

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { date, timeSlot, guests } = req.body;

    const reservation = await Restaurant_Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (date) reservation.date = date;
    if (timeSlot) reservation.timeSlot = timeSlot;
    if (guests) reservation.guests = guests;

    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation updated successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const adminCancelReservation = async (req, res) => {
  try {
    const reservation = await Restaurant_Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    reservation.status = "cancelled";

    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
  getReservationsByDate,
  updateReservation,
  adminCancelReservation,
};
