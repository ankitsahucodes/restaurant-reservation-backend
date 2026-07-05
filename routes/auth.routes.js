const express = require("express");

const router = express.Router();

const { signup, login, logout, me } = require("../controllers/auth.controller");

const verifyUser = require("../middlewares/verifyUser");

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", verifyUser, logout);

router.get("/me", verifyUser, me);

module.exports = router;
