const express = require("express");
const app = express();
const otpRouter = require("./routes/otpRoute");
const mongoose = require("mongoose");
var cors = require("cors");
app.use(cors());
main()
  .then(console.log("Connected successfully"))
  .catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:1234@cluster0.ohjbb2e.mongodb.net/otp?retryWrites=true&w=majority"
    );
    console.log("Connected successfully");
  } catch (err) {
    console.error("Connection error:", err);
  }
}

app.use(express.json());
app.use("/verification", otpRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000);
