import React from 'react'

function TafsirHeaderBtnDisplay({
  pageColored,
  darkMode,
  setDisplayingAllTafsir,
  displayingAllTafsir,
}) {
  return (
    <>

      {/* Tafsir Display Section */}
      {/* Tafsir Header && Btn Display */}
      <div className={`w-full flex justify-center items-center
          ${pageColored ? "bg-[#dff0d8] " : ""}
           ${darkMode ? "dark:bg-[#000]" : ""}
      `}
      >
        <div className='w-full container'>
          <div className={`w-full flex justify-center items-center flex-1 py-3 `}>
            <div className="relative w-full flex flex-col justify-center items-center grow text-lg">
              {/* Header of Tafsir Display Section */}
              <div className="w-full flex justify-center items-center ">
                <h1 className={`w-full sm:w-1/2 px-3 py-2  text-xl sm:text-2xl mb-3 text-center rounded-lg border 
                ${darkMode ? "w-full sm:w-full bg-black text-white border-[#5d5d5d]" : "border-[#dff0d8]  bg-white text-[#000]"}`}>
                  تفسير الآيات
                </h1>
              </div>

              {/* Btn of Tafsir Display Section */}
              <div className="w-full flex flex-wrap gap-2 sm:gap-9 justify-between items-center sm:flex-nowrap">

                <button
                  className={`w-full sm:w-1/2 lg:w-1/3 p-2 text-center rounded-lg border  
                   hover:text-white hover:border  cursor-pointer duration-200
                  ${darkMode
                      ? "text-white bg-[#000] border-[#5d5d5d] hover:bg-[#5d5d5d] hover:border-[#5d5d5d]"
                      : "hover:bg-[#22a5ad] hover:border-[#22a5ad] border-[#dff0d8] bg-[#fff] text-[#000]"}`}
                  onClick={() => setDisplayingAllTafsir(true)}
                >
                  <span> عرض تفسير كل الآيات في صفحة  </span>
                </button>

                <button
                  className={`w-full sm:w-1/2 lg:w-1/3 p-2 text-center rounded-lg border 
                   hover:text-white hover:border  cursor-pointer duration-200
                  ${darkMode
                      ? "text-white bg-[#000] border-[#5d5d5d] hover:bg-[#5d5d5d] hover:border-[#5d5d5d]"
                      : "border-[#dff0d8] bg-[#fff] text-[#000] hover:border-[#22a5ad] hover:bg-[#22a5ad]"}`}
                  onClick={() => setDisplayingAllTafsir(!displayingAllTafsir)}
                >
                  عرض تفسيــر كل آيتان في صفحــــة
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>



    </>
  )
}

export default TafsirHeaderBtnDisplay