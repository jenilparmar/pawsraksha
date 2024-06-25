import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import StateContext from "./mycontext";

export default function Donation() {
  const initialFormData = {
    name: "",
    contact: "",
    email: "",
    featureName: "",
    Amount: "",
  };
  const [amount, setAmount] = useState(0);
  const [upi, setUpi] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  function handleSubmit() {
    axios({
        // url: "http://localhost:3001/PaymentInfo", 
        url:"https://pawsraksha-1.onrender.com/PaymentInfo",
        method: "POST",
        headers: {
            authorization: "your token comes here",
        },
        data: formData,
    })
    .then(response => {
        alert(JSON.stringify(response.data)); // Alert the response data
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while submitting the data.");
    });
    
    console.log(formData);
    
  }
  useEffect(() => {
    axios
      .get("https://pawsraksha-1.onrender.com/env")
      .then((res) => {
        setUpi(res.data);
      })
      .catch((err) => {
        console.error("Error fetching UPI details:", err);
      });
  }, []);

  const payNow = () => {
    generateQRCode();
  };

  const generateQRCode = () => {
    const text = `upi://pay?pa=${encodeURIComponent(
      upi
    )}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent("Donation")}`;
    setQrCodeValue(text);
  };

  const { setDonate } = useContext(StateContext);

  return (
    <div className="container mx-auto p-2">
      <div className="max-w-md mx-auto my-12 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-6 text-center text-blue-400 font-bold">
          Donate Now
        </h1>
        <i
          className="fa-solid fa-xmark text-gray-700 relative -top-14 text-xl left-72 lg:right-96"
          onClick={() => {
            setDonate(true);
          }}></i>
        <input
          type="text"
          required
          name="name"
          id="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleChange(e);
          }}
          className="block w-full py-2 px-3 mb-4 leading-tight bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <input
          type="number"
          required
          name="contact"
          id="contact"
          placeholder="Your Contact"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
            handleChange(e);
          }}
          className="block w-full py-2 px-3 mb-4 leading-tight bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <input
          type="email"
          required
          name="email"
          id="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleChange(e);
          }}
          className="block w-full py-2 px-3 mb-4 leading-tight bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <p>Would you like to feature your name on our website?</p>
        <div className="flex items-center mb-4">
          <label className="mr-2">
            <input
              type="radio"
              name="featureName"
              value="yes"
              checked={showName}
              onChange={(e) => {
                setShowName(true);
                handleChange(e);
              }}
              className="mr-1"
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="featureName"
              value="no"
              checked={!showName}
              onChange={(e) => {
                handleChange(e);
                setShowName(false);
              }}
              className="mr-1"
            />{" "}
            No
          </label>
        </div>
        <input
          type="number"
          name="Amount"
          className="block w-full py-2 px-3 mb-4 leading-tight bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
          placeholder="Enter amount"
          required
          // value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            handleChange(e);
          }}
        />
        <button
          className="block w-full py-2 px-4 mb-4 leading-tight bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600"
          onClick={payNow}
          disabled={amount === 0}>
          Generate QR Code
        </button>
        {qrCodeValue !== "" && (
          <div className="text-center flex flex-col">
            <h2 className="text-lg font-semibold mb-2 mx-2">
              Scan QR Code to Pay
            </h2>
            <QRCode
              value={qrCodeValue}
              size={200}
              className="self-center border-4 p-3 rounded-md border-blue-500"
            />
            <button
              className="block w-full py-2 my-2 px-4 mb-4 leading-tight bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600 "
              onClick={() => {
                window.location.href = "https://pawsraksha.vercel.app/";
                handleSubmit();
              }}>
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
