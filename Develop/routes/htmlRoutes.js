const router = require("express").Router();
const path = require("path"); // Easier than relative pathing everything

router.get("/notes", (req, res) => {
  console.log(`GET REQUEST AT ${req.path} MADE`);
  res.sendFile(path.join(__dirname, "../public", "notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports = router;
