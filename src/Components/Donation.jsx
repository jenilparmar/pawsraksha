import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Donation() {
    const [amount ,setAmmount]=useState(0)
    const [upi,setUPI] = useState("");
   const payNow=()=>{
    axios.get(`https://pawsraksha-1.onrender.com/env`)
    .then(res=>{
        setUPI(res.data);
        console.log(upi);
    })
    .catch(e=>{
        console.log(e);
    })
   }
  return (
    <center>
        <div className="w-40 h-40 bg-blue-300"> 
            <input type="number"  className='bg-black text-white my-12' required onChange={(e)=>setAmmount(e.target.value)} />
            <div
            className=" button bg-blue-400 my-4 border-2 border-black hover:bg-blue-500 cursor-pointer self-center text-center font-semibold p-2 rounded-lg text-black w-40"
            onClick={() => {
                payNow();
            }}>
           PAY NOW 
          </div>
        </div>
    </center>
  )
}
