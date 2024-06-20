// import axios from 'axios';
// import React, { useState } from 'react';

// export default function Donation() {
//     const [amount, setAmount] = useState(0);
//     const [upi, setUpi] = useState("");
//     const [qrCode, setQrCode] = useState("");

//     const payNow = () => {
//         // Replace with your actual API endpoint for fetching UPI details
//         axios.get(`https://example.com/api/upi`)
//             .then(res => {
//                 setUpi(res.data.upi);
//                 generateQRCode();
//             })
//             .catch(err => {
//                 console.error('Error fetching UPI details:', err);
//             });
//     }

//     const generateQRCode = () => {
//         // Constructing the UPI link based on fetched UPI and amount
//         var text = `upi://pay?pa=${encodeURIComponent(upi)}&pn=YourName&am=${amount}&cu=INR&tn=${encodeURIComponent('Donation')}`;

//         // Generate QR Code using QRCode.js library or similar (not included in React snippet)
//         // For React, consider using a React QR Code library like 'react-qr-code'

//         // Example of setting QR code URL to state
//         setQrCode(text);
//     }

//     return (
//         <center>
//             <div className="w-40 h-40 bg-blue-300">
//                 <input type="number" className='bg-black text-white my-12' required onChange={(e) => setAmount(e.target.value)} />
//                 <div className="button bg-blue-400 my-4 border-2 border-black hover:bg-blue-500 cursor-pointer self-center text-center font-semibold p-2 rounded-lg text-black w-40"
//                     onClick={() => payNow()}>
//                     PAY NOW
//                 </div>
//             </div>
//             {qrCode && (
//                 <div>
//                     <h2>Generated QR Code:</h2>
//                     {/* Render QR code here */}
//                     {/* Example placeholder */}
//                     <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCode)}&size=200x200`} alt="QR Code" />
//                 </div>
//             )}
//         </center>
//     )
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

export default function Donation() {
    const [amount, setAmount] = useState(0);
    const [upi, setUpi] = useState('');
    const [qrCodeValue, setQrCodeValue] = useState('');
    
useEffect(()=>{
    axios.get('https://pawsraksha-1.onrender.com/env')
    .then(res => {
        setUpi(res.data);
    })

    .catch(err => {
        console.error('Error fetching UPI details:', err);
    });
},[])
    const payNow = () => {
        generateQRCode();
    }

    const generateQRCode = () => {
        // Constructing the UPI link based on fetched UPI and amount
       
        const text = `upi://pay?pa=${encodeURIComponent(upi)}&pn=YourName&am=${amount}&cu=INR&tn=${encodeURIComponent('Donation')}`;
        setQrCodeValue(text);
        console.log(qrCodeValue);
        alert(qrCodeValue)
    }

    return (
        <div className="container mx-auto">
            <div className="max-w-md mx-auto my-12 p-6 bg-gray-100 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center">Donate Now</h1>
                <input
                    type="number"
                    className="block w-full py-2 px-3 mb-4 leading-tight bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
                    placeholder="Enter amount" required
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    className="block w-full py-2 px-4 mb-4 leading-tight bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600"
                    onClick={payNow}
                >
                    Generate QR Code
                </button>
                {qrCodeValue!='' && (
                   <center>
                     <div className="text-center">
                        <h2 className="text-lg font-semibold mb-2">Scan QR Code to Pay</h2>
                        <QRCode value={qrCodeValue} size={200} />
                    </div>
                   </center>
                )}
            </div>
        </div>
    );
}
