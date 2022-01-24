const pkg = require("express");
const { Router } = pkg;
const listController = require('./controller/listcontroller.js')
const router = Router();
router.get("/api/getAllTestListItems", listController.getAllTestListItems);
router.get("/api/getNextListItems", listController.getNextListItems);
router.get("/api/getListItemCount", listController.getListItemCount);
router.post("/api/createListItem", listController.createListItem);
router.post("/api/updateListItem", listController.updateListItem);
router.delete("/api/deleteListItem", listController.deleteListItem);
module.exports = router;
