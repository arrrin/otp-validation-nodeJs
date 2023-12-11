var express = require("express");
var router = express.Router();
const OTPModel = require("../model/OTP");

/* GET users listing. */

// User send mobile phone
router.post("/mobile", async function (req, res, next) {
  const { mobile } = req.body;
  let number = (Math.random() + 1).toString(36).substring(7);
  let reference = (Math.random() + 1).toString(36).substring(7);
  const data = new OTPModel({
    mobile: mobile,
    number: number,
    reference: reference,
  });
  try {
    let check = await OTPModel.findOneAndDelete({mobile});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }

  try {
    await data.save();
    res.status(201).json({otp:data, message: "OTP entry created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// User send mobile phone
router.post("/validate", async function (req, res, next) {
  const { otp,mobile,reference } = req.body;

  let check = await OTPModel.findOneAndUpdate({otp,mobile});
  console.log("🚀 ~ file: otpRoute.js:40 ~ check:", check)
  console.log("🚀 ~ file: otpRoute.js:40 ~ check:", check.number)
  console.log("🚀 ~ file: otpRoute.js:43 ~ otp:", otp)

  if (check.number === otp && check.reference ==reference) {
    res.status(200).json({ message: "OTP valid" });
  } else {
    res.status(400).json({ message: "OTP not valid" });
  }
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Server send OTP
router.post("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
