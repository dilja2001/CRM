const express = require("express")
const router = express.Router()
const leadController = require("../controllers/leadController")
const auth = require("../middleware/authMiddleware")
const role = require("../middleware/roleMiddleware")


router.post("/",auth,leadController.createLead)
router.get("/",auth,leadController.getLeads)
router.put("/:id",auth,leadController.updateLead)

router.put("/assign/:id",auth,role("admin"),leadController.assignLead)
router.delete("/:id",auth,role("admin"),leadController.deleteLead)

module.exports = router