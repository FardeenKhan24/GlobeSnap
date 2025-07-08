const express = require("express");
const router = express.Router();
const {
  createJournal,
  getUserJournals,
  deleteJournal,
  editJournal,
} = require("../controllers/journalController");

const upload = require("../utils/cloudinaryUpload");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, upload.array("images", 10), createJournal);
router.get("/", protect, getUserJournals);
router.delete("/:id", protect, deleteJournal);
router.put("/:id", protect, upload.array("images", 10), editJournal);

module.exports = router;
