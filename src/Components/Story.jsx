import React from "react";

export default function Story() {
  return (
    <div className="container mx-auto p-4">
      <div className="stories bg-slate-100 rounded-lg shadow-md p-6">
        <div className="text-center font-bold text-blue-400 text-3xl md:text-5xl p-5">
          Success Stories
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="rounded-full w-60 h-60 border-2 border-blue-500 flex justify-center overflow-hidden">
              <div
                className="rounded-full w-full h-full"
                style={{
                  backgroundImage:
                    "url(https://images.theconversation.com/files/560110/original/file-20231117-29-fv986f.jpg?ixlib=rb-4.1.0&rect=0%2C15%2C5048%2C3340&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div className="flex flex-col w-full md:w-80 h-60 bg-red-400"></div>
            <div
              className="w-48 h-48 md:w-60 md:h-60 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage:
                  "url(https://iili.io/d95aJv1.png)",
              }}
            ></div>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div
              className="w-40 h-40 md:w-60 md:h-60 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage:
                  "url(https://iili.io/d95auun.png)",
              }}
            ></div>
            <div className="flex flex-col w-full md:w-80 h-60 bg-red-400"></div>
            <div className="rounded-full w-60 h-60 border-2 border-blue-500 flex justify-center overflow-hidden">
              <div
                className="rounded-full w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k)",
                }}
              ></div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="button bg-blue-400 hover:bg-blue-500 text-black font-semibold p-2 rounded-lg w-40">
              See More
            </button>
          </div>
        </div>
        <div className="font-medium text-center mt-4">
          Contact Us: For more information on how you can help, email us at{" "}
          <a
            href="mailto:jenilparmar94091@gmail.com"
            className="text-blue-400 hover:text-blue-500"
          >
            jenilparmar94091@gmail.com
          </a>
          .
        </div>
      </div>
    </div>
  );
}
