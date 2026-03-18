const express = require("express")
const router = express.Router()
const noteController = require("../controllers/noteController")
const auth = require("../middleware/authMiddleware")

router.post("/",auth,noteController.addNote)
router.get("/",auth,noteController.getNotes)

module.exports = router