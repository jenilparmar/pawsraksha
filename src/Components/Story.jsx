import React from "react";

export default function Story() {
  return (
    <>
      <center>
        <div className="stories w-11/12 h-fit   flex flex-col bg-slate-100">
          <div className="text-center font-bold text-blue-400 text-5xl p-5">
            Success Stories
          </div>
          <div className="flex  flex-col h-fit my-2 gap-5">
            <div className="flex flex-row justify-start gap-8 w-full">
            <div className="rounded-full w-60 h-60 border-2 border-blue-500 flex justify-center">
              <div className="rounded-full w-56 h-56 self-center" style={{
                backgroundImage:"url(https://images.theconversation.com/files/560110/original/file-20231117-29-fv986f.jpg?ixlib=rb-4.1.0&rect=0%2C15%2C5048%2C3340&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip)",
                backgroundPosition:"center",
                backgroundSize:"cover"
              }}></div>
              </div>
              <div className="flex flex-row bg-red-400 w-80 h-56"></div>
              <div className="w-48 h-48 self-center" style={{
                backgroundImage:"url(https://iili.io/d95aJv1.png)",
                backgroundPosition:"center",
                backgroundSize:"cover"
              }}></div>
            </div>
            <div className="flex flex-row justify-end gap-8 w-full">
            <div className="w-40 h-40 self-center" style={{
                backgroundImage:"url(https://iili.io/d95auun.png)",
                backgroundPosition:"center",
                backgroundSize:"cover"
              }}></div>
              <div className="flex flex-row bg-red-400 w-80 h-56"></div>
              <div className="rounded-full w-60 h-60 border-2 border-blue-500 flex justify-center">
              <div className="rounded-full bg-red-300 w-56 h-56 self-center"  style={{
                backgroundImage:"url(https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k)",
                backgroundPosition:"center",
                backgroundSize:"cover"
              }}></div>
              </div>
              {/* ""
              ""  */}
             
            </div>
            <div className=" button bg-blue-400 border-2 border-black hover:bg-blue-500 cursor-pointer self-center text-center font-semibold p-2 rounded-lg text-black w-40">
         See More
        </div>
          </div>
        </div>
        <div className='font-medium p-3 -my-2'>
    Contact Us:
    For more information on how you can help, email us at <a href="mailto:jenilparmar94091@gmail.com" className='text-blue-400 hover:text-blue-500'>
      jenilparmar94091@gmail.com
      </a>.
    </div>
      </center>
    </>
  );
}
