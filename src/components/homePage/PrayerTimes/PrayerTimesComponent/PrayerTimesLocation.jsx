import React from 'react'

function PrayerTimesLocation({ darkMode, time, hijriDate, gregorianDate, remaining, remainingSecond, remainingMinute, remainingHour, getPrayerName, }) {//getPrayerName(nextPrayer.name) 

  return (
    <>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 h-full ">

        {/* Location & Time */}
        <div className={`md:col-span-1 xl:col-span-2 flex flex-wrap justify-center items-between gap-6 rounded-lg  pr-3
                ${darkMode ? "bg-[#000] border border-[#5d5d5d]" : "bg-[#fff]"}`}
        >
          <h3 className={`w-full text-center md:text-start text-4xl font-bold  ${darkMode ? "text-white" : "text-black"}`}>
            مصر, المنيا
          </h3>

          <p className={`w-full text-center md:text-start text-4xl font-bold  ${darkMode ? "text-white" : "text-teal-600"}`}>
            <span className="w-full text-orange-600 font-bold"> {time} </span>
          </p>

          <p className={`w-full text-center md:text-start text-lg md:text-2xl font-bold  ${darkMode ? "text-white" : "text-teal-600"}`}>
            التاريخ هجري : {hijriDate}
          </p>

          <p className={`w-full text-center md:text-start text-lg md:text-2xl font-bold  ${darkMode ? "text-white" : "text-teal-600"}`}>
            التاريخ الميلادي : {gregorianDate}
          </p>

        </div>

        {/* Prayer Countdown */}
        <div
          className={`md:col-span-1 xl:col-span-1 flex flex-wrap justify-center items-center gap-6 p-6 rounded-lg shadow-lg 
                ${darkMode ? "bg-[#000] border border-[#5d5d5d]" : "bg-[#22a5ad] text-white"}`}
        >
          <p className="w-full flex flex-wrap justify-center items-center gap-2 text-2xl font-bold text-center">
            <span className={`text-white`}> الصلاه القادمة هي صلاة  </span>
            <span className={`border-2  rounded-lg p-2 text-white ${darkMode?"border-[#5d5d5d]":"border-[#ddd]"}`}> {getPrayerName} </span>
          </p>

          <span className={`w-full flex flex-wrap justify-center items-center gap-2 text-start font-bold text-xl p-2`}>
            <span className={`text-white`}> * متبقي على صلاة  {getPrayerName}{" "}  :  </span>
            <span className={`p-2 border  rounded-lg  text-white ${darkMode?"border-[#5d5d5d]":"border-[#ddd]"}`}> {remaining} </span>
          </span>

          <div className={`w-full flex justify-between items-center gap-3 text-xl text-center rounded-xl p-3 
                    ${darkMode ? "bg-[#000] border border-[#5d5d5d]" : "text-black "}`}
          >
            <span className={`w-full py-3 rounded-lg duration-500 cursor-pointer 
                      ${darkMode ? "text-white bg-[#000] border border-[#5d5d5d] hover:bg-[#666]" : "bg-[#fff] text-[#22a5ad] hover:bg-[#000] hover:text-white "}`}
            >
              {remainingSecond}
            </span>

            <span className={`w-full py-3  rounded-lg duration-500 cursor-pointer  
                      ${darkMode ? "text-white bg-[#000] border border-[#5d5d5d] hover:bg-[#666]" : "text-[#22a5ad] bg-[#fff] hover:bg-[#000] hover:text-white"}`}
            >
              {remainingMinute}
            </span>

            <span className={`w-full py-3  rounded-lg duration-500 cursor-pointer 
                      ${darkMode ? "text-white bg-[#000] border border-[#5d5d5d] hover:bg-[#666]" : "bg-[#fff] text-[#22a5ad] hover:bg-[#000] hover:text-white "}`}
            >
              {" "}
              {remainingHour}{" "}
            </span>

          </div>

        </div>

      </div>

    </>
  )
}

export default PrayerTimesLocation