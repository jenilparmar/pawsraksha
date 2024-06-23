import React, { useState } from 'react';

export default function DashBoard({ setDeshBoard }) {
    const [check, setCheck] = useState(false);

    return (
        <>
            <center>
                <div className='bg-slate-300 w-11/12 lg:w-2/3 h-full my-2 flex flex-col p-4 rounded-md shadow-lg'>
                    <i className="fa-solid fa-xmark self-end text-xl cursor-pointer" onClick={() => {
                        setDeshBoard(false);
                    }}></i>
                    <div className='self-start p-2 font-semibold text-3xl'>Welcome</div>
                    <div className='self-start text-xl font-medium p-2'>Name: John Doe</div>
                    <div className='self-start text-xl font-medium p-2'>Contact: +1234567890</div>
                    <div className='self-start text-xl font-medium p-2 text-left'>Email:john.doe@example.com</div>
                    
                    <div className='bg-blue-400 p-2 text-xl font-medium border-2 border-black rounded-lg w-full lg:w-2/3 my-1 self-center text-center'>Injured Animals Around</div>
                    <div className="w-full lg:w-2/3 border-2 bg-gray-300 h-16 self-center flex flex-row justify-start p-2 my-2 rounded-md">
                        <div className="rounded-md bg-red-500 w-14 h-10 flex-shrink-0"></div>
                        <div className='ml-4 flex flex-col justify-center'>
                            <div className='text-left text-xl font-semibold'>Cat</div>
                            <div className='text-blue-400 hover:text-blue-500 cursor-pointer'>Get Location</div>
                        </div>
                        <div className={`w-8 h-8 self-center ml-auto flex flex-row justify-center items-center border-2 rounded-lg border-black cursor-pointer`} onClick={() => { setCheck(!check) }}>
                            {check ? <i className="fa-solid fa-check font-bold text-xl transition-all duration-300"></i> : undefined}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 border-2 bg-gray-300 h-16 self-center flex flex-row justify-start p-2 my-2 rounded-md">
                        <div className="rounded-md bg-red-500 w-14 h-10 flex-shrink-0"></div>
                        <div className='ml-4 flex flex-col justify-center'>
                            <div className='text-left text-xl font-semibold'>Dog</div>
                            <div className='text-blue-400 hover:text-blue-500 cursor-pointer'>Get Location</div>
                        </div>
                        <div className={`w-8 h-8 self-center ml-auto flex flex-row justify-center items-center border-2 rounded-lg border-black cursor-pointer`} onClick={() => { setCheck(!check) }}>
                            {check ? <i className="fa-solid fa-check font-bold text-xl transition-all duration-300"></i> : undefined}
                        </div>
                    </div>

                    <div className='bg-green-400 p-2 text-xl font-medium border-2 border-black rounded-lg w-full lg:w-2/3 my-1 self-center text-center'>Cured Cases</div>
                    <div className="w-full lg:w-2/3 border-2 bg-gray-300 h-16 self-center flex flex-row justify-start p-2 my-2 rounded-md">
                        <div className="rounded-md bg-green-500 w-14 h-10 flex-shrink-0"></div>
                        <div className='ml-4 flex flex-col justify-center'>
                            <div className='text-left text-xl font-semibold'>Rabbit</div>
                            <div className='text-green-400 hover:text-green-500 cursor-pointer'>Get Details</div>
                        </div>
                        <div className={`w-8 h-8 self-center ml-auto flex flex-row justify-center items-center border-2 rounded-lg border-black cursor-pointer`} onClick={() => { setCheck(!check) }}>
                            {check ? <i className="fa-solid fa-check font-bold text-xl transition-all duration-300"></i> : undefined}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 border-2 bg-gray-300 h-16 self-center flex flex-row justify-start p-2 my-2 rounded-md">
                        <div className="rounded-md bg-green-500 w-14 h-10 flex-shrink-0"></div>
                        <div className='ml-4 flex flex-col justify-center'>
                            <div className='text-left text-xl font-semibold'>Bird</div>
                            <div className='text-green-400 hover:text-green-500 cursor-pointer'>Get Details</div>
                        </div>
                        <div className={`w-8 h-8 self-center ml-auto flex flex-row justify-center items-center border-2 rounded-lg border-black cursor-pointer`} onClick={() => { setCheck(!check) }}>
                            {check ? <i className="fa-solid fa-check font-bold text-xl transition-all duration-300"></i> : undefined}
                        </div>
                    </div>
                </div>
            </center>
        </>
    );
}
