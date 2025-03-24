const express = require("express");
const { getAllRhums, searchRhums } = require("../controllers/rhumController");
const router = express.Router();

router.get("/", getAllRhums);
router.get("/search", searchRhums);

module.exports = router;