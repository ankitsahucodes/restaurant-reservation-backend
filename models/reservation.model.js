const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant_User",
      required: true,
    },

    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant_Table",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Restaurant_Reservation", reservationSchema);
