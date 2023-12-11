const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema(
  {
    number: { type: String ,require:true},
    reference: { type: String },
    mobile: { type: String },
  },
  {
    collection: "otp",
  }
);

module.exports = mongoose.model("otp", OTPSchema);
