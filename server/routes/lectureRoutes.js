const express = require("express");
const { createLecture } = require("../controllers/LectureController");
const { isAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

router.route("/create").post(isAuthenticated, createLecture);

module.exports = router;
