import React from 'react'

function AyahsDisplaySection({
  loading,
  error,
  versesList,
  imageDark,
  imageLight,
  darkMode,
  pageColored,
}) {
  return (
    <>
      {/* Ayahs Display */}
      <div className={`w-full flex justify-center items-center 
        ${pageColored ? "bg-[#d9edf7]" : ""}
        ${darkMode ? 'dark:border-[#5d5d5d] dark:bg-[#000]' : ''}
        `}
      >
        <div className='w-full container'>

          <div className={`w-full flex flex-wrap justify-center items-center min-h-[100px] `}>

            <div className={`w-full flex flex-wrap text-justify py-3 gap-2 sm:gap-1`}>

              <p className={`w-full flex justify-center items-center text-lg sm:text-xl ${darkMode ? "text-[#fff]" : "text-[#000] "}`}>
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>

              <div className={`w-full my-3 leading-8 text-justify ${darkMode ? "text-[#f1f1f1] border-[#5d5d5d]" : "text-[#000] border-[#000]"}`}
                dir="rtl"
              >
                {loading && <p> Loading ..... </p>}
                {!loading && error && <p> {error} </p>}
                {!loading && !error && versesList && versesList.length > 0 ? (
                  versesList.map((ayah, index) => (
                    <React.Fragment key={index}>
                      <span className={`text-lg text-justify`}>
                        {ayah.text}
                        <span className={`relative inline-block w-8 h-9 align-middle`}>
                          <img
                            src={darkMode ? imageDark : imageLight}
                            alt={`Ayah ${ayah.numberInSurah}`}
                            title={`Ayah ${ayah.numberInSurah}`}
                            className={`w-full h-full `}
                          />
                          <span className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center text-[12px] font-bold `}>
                            {ayah.numberInSurah}
                          </span>
                        </span>{" "}
                      </span>
                    </React.Fragment>
                  ))
                ) : (
                  <span className={`w-full flex justify-center items-center text-2xl ${darkMode ? "text-[#fff]" : "text-[#000] "}`}>
                    {/* This message will now display if there are no verses */}
                    "الآيــــــــــــات القــرآنيــــــــــــة"
                  </span>
                )}
              </div>

              <p className={`w-full flex justify-center items-center  text-lg sm:text-xl ${darkMode ? "text-[#fff]" : "text-[#000]"}`}>
                صَدَقَ اللهُ العَظيمُ
              </p>

            </div>


          </div>
        </div>

      </div>

    </>

  )
}

export default AyahsDisplaySection