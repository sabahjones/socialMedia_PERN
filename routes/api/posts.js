const express = require("express");
const router = express.Router();

// posts test route
router.get("/test", (req, res) => res.json({ test: "posts test route works" }));

module.exports = router;
