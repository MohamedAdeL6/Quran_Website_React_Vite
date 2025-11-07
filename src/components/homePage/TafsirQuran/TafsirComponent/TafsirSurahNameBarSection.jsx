import React from 'react'

function TafsirSurahNameBarSection({
  selectSurahName,
  darkMode,
  selectedTafsirName,
  fromAyah,
  toAyah,
  pageColored
}) {



  let sharedClass = `w-full h-full flex justify-center items-center px-3 py-2  text-center border rounded-md 
                          ${darkMode ? "text-[#fff] bg-[#000] border-[#5d5d5d] " : " border-[#dff0d8] bg-white"}
                          `

  return (
    <>
      {/* Tafsir Name && Soura Name Section */}
      <div className={`w-full flex justify-center items-center
        ${pageColored ? "bg-[#dff0d8]" : ""}
        ${darkMode ? "dark:bg-[#000]" : ""}`} 
        dir="rtl"
      >
        <div className='container w-full'>
          <div className={`w-full flex justify-center items-center gap-2  py-3 `}>

            <p className={sharedClass}>
              {selectSurahName ? `${selectSurahName}` : ` سُورَةُ  `}
            </p>

            <p className={sharedClass}>
              {selectedTafsirName ? `${selectedTafsirName}` : ` تفسيــر `}
            </p>

            <p className={`w-full h-full flex justify-center items-center px-3 py-2 text-center rounded-md border 
             ${darkMode
                ? "text-[#fff] bg-[#000] border-[#5d5d5d] "
                : "bg-white border-[#ddd] "}
              `}
            >
              {fromAyah && toAyah ? ` من الآية  ${fromAyah} : ${toAyah} ` : ` الآيــــات `}
            </p>

          </div>
        </div>
      </div>
    </>
  )
}

export default TafsirSurahNameBarSection