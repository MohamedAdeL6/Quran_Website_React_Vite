import React from 'react'

function PrayerTimesHeader({ darkMode, prayerTimeLogo }) {
  return (
    <>
      <div className={`w-full flex justify-center items-center md:mb-5 `}>
        <div className={`flex justify-center items-center gap-4 border-b-2 py-4  
                    ${darkMode ? "border-[#5d5d5d]" : "border-[#22a5ad]"}`}
        >
          <div className="flex justify-center items-center">
            <img src={prayerTimeLogo} alt=" مواقيت الصلاة " title=" مواقيت الصلاة " />
          </div>

          <div className="flex justify-center items-center">
            <h2 className={`w-full text-2xl sm:text-3xl font-bold  ${darkMode ? "text-white" : "text-[#22a5ad]"}`}>
              مواقيت الصلاة فى المنيا
            </h2>
          </div>

        </div>
      </div>

    </>
  )
}

export default PrayerTimesHeader