const express = require("express");
const router = express.Router();



//* answer controllers

const { answeredquestions, answerquestions } = require("../controller/answerController");

//* authontication middleware - home page
router.get("/answers/:questionid", answeredquestions)


router.post("/answerquestions/:questionid", answerquestions)



module.exports = router