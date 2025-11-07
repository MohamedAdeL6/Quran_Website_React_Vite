import React from 'react'

function PrayerTimesTable({
  loading,
  timings,
  darkMode,
  getPrayerName,  //  getPrayerName(prayer)
  error,
  // eslint-disable-next-line no-unused-vars
  Icon,
}) {
  return (
    <>

      {/* Prayer Times Table */}
      <div className="w-full flex justify-center">
        {loading ? (
          <div className={`w-full flex flex-col items-center justify-center p-6 shadow-xl text-2xl font-bold text-gray-600 border rounded-xl bg-white`}>
            <span>جاري تحميل أوقات الصلاة ........</span>
            <Icon className="animate-spin text-4xl mt-2 text-orange-600" />
          </div>
        ) : timings && timings.timings ? (

          <div className={`w-full overflow-x-auto shadow-lg rounded-lg border  px-3 pb-5 ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}>

            {/* Mobile & Tablet View (Cards in Two Columns for Tablet) */}
            <div className="w-full flex flex-wrap justify-center items-center">

              <div className="w-full ">
                <h1 className={`text-3xl font-bold text-center px-3 py-5  ${darkMode ? "text-white" : "text-[#22a5ad]"}`}>
                  <span > اليوم : </span>
                  <span>  {["الأحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"][new Date().getDay()]} </span>
                </h1>
              </div>

              <div className={`w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 p-4 border rounded-xl
                       ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}>
                {Object.keys(timings.timings).map((prayer, index) => (
                  !["Imsak", "Sunset", "Firstthird"].includes(prayer) && ( 
                    <div key={index} className={`w-full flex flex-wrap justify-between items-center px-2  rounded-lg border 
                             ${darkMode ? "bg-[#000] border-[#5d5d5d]" : "border-[#ddd] bg-gray-100"}`}>
                      <span className={`w-full flex justify-center items-center gap-2 text-lg font-semibold border-b  ${darkMode?"border-[#5d5d5d]":"border-[#ccc]"}`}>
                        {
                          <>
                            <span className="py-2">
                              {prayer === "Fajr" ? "🕌" : prayer === "Maghrib" ? "🌆" :
                                prayer === "Isha" ? "🌃" : prayer === "Midnight" ? "🌙" :
                                  prayer === "Firstthird" ? "🌙" : prayer === "Lastthird" ? "🌙" :
                                    prayer === "Sunrise" ? "🌅" : prayer === "Dhuhr" ? "☀️" :
                                      prayer === "Asr" ? "🌇" : prayer === "Imsak" ? "🌙" : "☀️"
                              }
                            </span>

                            <span className={`py-2 text-md md:text-xl ${darkMode ? "text-white" : ""}`}>
                              {getPrayerName(prayer)}
                            </span>

                          </>
                        }
                      </span>

                      <span className={`w-full flex justify-center items-center text-lg font-bold py-2
                               ${darkMode ? "text-white" : ""}`}>
                        {timings.timings[prayer]}
                      </span>

                    </div>
                  )
                ))}
              </div>

            </div>

          </div>
        ) : (
          <div className="text-lg font-bold text-red-600">
            <span> {JSON.stringify(error)} </span>
            <span>   تعذر تحميل البيانات  </span>
          </div>
        )}
      </div>

    </>
  )
}

export default PrayerTimesTable