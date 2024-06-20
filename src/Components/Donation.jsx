import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import StateContext from './mycontext';

export default function Donation() {
    const [amount, setAmount] = useState(0);
    const [upi, setUpi] = useState('');
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [showName, setShowName] = useState(false);

    useEffect(() => {
        axios.get('https://pawsraksha-1.onrender.com/env')
            .then(res => {
                setUpi(res.data);
            })
            .catch(err => {
                console.error('Error fetching UPI details:', err);
            });
    }, []);

    const payNow = () => {
        generateQRCode();
    }

    const generateQRCode = () => {
        const text = `upi://pay?pa=${encodeURIComponent(upi)}&pn=YourName&am=${amount}&cu=INR&tn=${encodeURIComponent('Donation')}`;
        setQrCodeValue(text);
        console.log(qrCodeValue);
        // alert(qrCodeValue);
    }
    const {setDonate} = useContext(StateContext)
    return (
        <div className="container shadow-md mx-auto p-2">
            <div className="max-w-md mx-auto my-12 p-6 bg-gray-100 rounded-lg shadow-lg">
                <h1 className="text-2xl mb-6 text-center text-blue-400 font-bold">Donate Now</h1>
                <i class="fa-solid fa-xmark text-gray-700 absolute top-16 text-xl right-5 lg:right-96" onClick={()=>{
                    setDonate(true)
                }}></i>
                <input type="text" name="name" id="text" placeholder="Your Name" className="block w-full py-2 px-3 mb-4 leading-tight bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"/>
                <input type="number" name="contact" id="contact" placeholder="Your Contact" className="block w-full py-2 px-3 mb-4 leading-tight bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"/>
                <input type="email" name="email" id="email" placeholder="Your Email" className="block w-full py-2 px-3 mb-4 leading-tight bg-gray-200 border-2 border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"/>
                <p>Would you like to feature your name on our website?</p>
                <div className="flex items-center mb-4">
                    <label className="mr-2">
                        <input type="radio" name="featureName" value="yes" checked={!showName} onChange={() => setShowName(true)} className="mr-1"/> Yes
                    </label>
                    <label>
                        <input type="radio" name="featureName" value="no" checked={showName} onChange={() => setShowName(false)} className="mr-1"/> No
                    </label>
                </div>
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
                {qrCodeValue !== '' && (
                    
                        <div className="text-center flex flex-col">
                            <h2 className="text-lg font-semibold mb-2 mx-2">Scan QR Code to Pay</h2>
                            <QRCode value={qrCodeValue} size={200} className='self-center border-4 p-3 rounded-md border-blue-500' />
                        </div>
         
                )}
            </div>
        </div>
    );
}
