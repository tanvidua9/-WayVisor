const express = require("express");
const router = express.Router();
const systemRouter=require("./system");
const userRouter=require("./user");
const weatherRouter=require("./weather");
const chatbotRouter=require("./chatbot");
const flightRouter=require("./flight");

router.use("/user", userRouter);
router.use("/weather", weatherRouter);
router.use("/system", systemRouter);
router.use("/chatbot",chatbotRouter);
router.use("/flight",flightRouter);


module.exports = router;
