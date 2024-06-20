import React, { useContext } from 'react'
import StateContext from './mycontext'

export default function Donate() {
  const {setDonate} = useContext(StateContext);
  return (
    <>
     <center>
     <div className="donate w-11/12 h-fit bg-slate-200 ">
    <div className="text-5xl font-bold p-5 text-blue-400">Support Our Rescue Efforts</div>
    <h2 className='font-semibold text-xl my-5 text-red-600'>Your donation can make a difference!</h2>
    <p className='w-10/12 my-5'>Help us save more animals by making a donation today. Every contribution, big or small, helps us provide the care and support that injured and homeless animals need.</p>
    <div className=" bg-blue-400 border-2 border-black hover:bg-blue-500 cursor-pointer self-center text-center my-10 font-semibold p-2 rounded-lg text-black w-40" onClick={()=>{
      setDonate(false)
    }}>
         Donate
        </div>
    <div className='font-medium p-3 -my-2'>
    Contact Us:
    For more information on how you can help, email us at <a href="mailto:jenilparmar94091@gmail.com" className='text-blue-400 hover:text-blue-500'>
      jenilparmar94091@gmail.com
      </a>.
    </div>
     </div>
     </center>
    </>
  )
}
