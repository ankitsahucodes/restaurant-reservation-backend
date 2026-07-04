const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();

const seedData = require("./seed/seedTables");
// seedData();
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser());


const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// auth Routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// reservation Routes
const reservationRoutes = require("./routes/reservation.routes");
app.use("/reservation", reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
