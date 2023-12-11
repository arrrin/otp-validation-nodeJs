import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [reference, setReference] = useState("");
  const [response, setResponse] = useState("");

  const handleMobileSubmit = () => {
    console.log("🚀 ~ file: App.jsx:17 ~ handleMobileSubmit ~ mobile:", mobile)
    axios
      .post("http://localhost:3000/verification/mobile", {
        mobile: mobile,
      })
      .then(function (response) {
      const otpData = response.data.otp
        setReference(otpData.reference);
        setNumber(otpData.number);
       
      })
      .catch(function (error) {
        setErr(error)
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const handleOtpSubmit = () => {
    axios
      .post("http://localhost:3000/verification/validate", {
        otp: otp,
        mobile:mobile,

      })
      .then(function (response) {
        setResponse(response.data.message);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  return (
    <>
      <h1>OTP TEST</h1>
      <div>
      <label>Mobile</label>
      <input value={mobile} onChange={(e) => setMobile(e.target.value)}></input>
      <button onClick={handleMobileSubmit}>submit</button>
      </div>
      
<div>
      <label>OTP</label>
      <input value={otp} onChange={(e) => setOtp(e.target.value)}></input>
      <button onClick={handleOtpSubmit}>submit otp</button>
        
      </div>

      <p>{number} , {reference}</p>
      <div>
        {response }
        
      </div>
    </>
  );
}

export default App;
