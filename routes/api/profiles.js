const express = require("express");
const router = express.Router();

// profiles test route
router.get("/test", (req, res) =>
  res.json({ test: "profiles test route works" })
);

module.exports = router;
