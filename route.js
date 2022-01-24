const pkg = require("express");
const { Router } = pkg;
const listController = require('./controller/listcontroller.js')
const router = Router();
router.get("/api/getAllTestListItems", listController.getAllTestListItems);
module.exports = router;
