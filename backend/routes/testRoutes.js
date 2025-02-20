const express = require('express')
const router = express.Router()
const TestCtrl = require('../controllers/testController')
const auth = require("../middleware/authMiddleware");
router.get('/ielts',auth.protect, TestCtrl.getIeltsInfo);
router.get("/toeic",  auth.protect,TestCtrl.getToeicInfo);
router.get("/", TestCtrl.getAllTest);
router.get("/:resultId", TestCtrl.getTestByResult);  
module.exports = router


//get Test by resultid
//router.get('/toeic',auth.protect,TestCtrl.getToeicInfo);  // for protected routes