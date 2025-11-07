import React from 'react'

function DisplayAllAzkarNew({
  phrases,
  darkMode,
  counters,
  isDeleteMode,
  selectedForDeletion,
  incrementCounter,
  resetCounter,
  toggleCheckbox,
  images,
  setOpenPage,
}) {

  return (
    <>
      {/* Display all azkar */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`} dir="rtl">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className={`relative flex flex-wrap justify-between items-between gap-3 border rounded shadow-lg 
                  ${darkMode ? `border-[#5d5d5d]` : `border-blue-200`
              }`}
          >
            <h2 className={`w-full flex justify-center items-center text-center text-2xl sm:text-3xl font-semibold duration-300 hover:text-[#22a5ad] border-b p-4 
                   ${darkMode ? `text-white bg-black border-[#5d5d5d]` : `bg-[#e8e8e8] border-[#ddd] text-black`}`} >
              {phrase}
            </h2>

            <div className="w-full flex justify-center items-center mb-4 py-3">
              <div className="relative w-fit flex justify-center items-center">

                <img src={images[index % images.length]} className="w-55 h-55" />

                <p className={`DSDigital text-4xl absolute right-[15%] top-[29%] -translate-x-1/2 -translate-y-1/2`}
                  onClick={() => incrementCounter(index)}
                >
                  {counters[index]}
                </p>

                <button className={`absolute left-1/2 bottom-[15px] -translate-x-1/2  h-18 w-21 rounded-full text-md cursor-pointer `}
                  onClick={() => incrementCounter(index)}
                >
                </button>

                <button className={`absolute right-[11%] bottom-[28%] -translate-x-1/2 -translate-y-1/2 h-7 w-7 rounded-full text-md cursor-pointer`}
                  onClick={() => resetCounter(index)}
                >
                </button>

              </div>
            </div>

            {/* Show checkbox in delete mode */}
            {isDeleteMode && (
              <div className={`w-full h-full flex justify-start items-end  absolute left-0 top-0
                    ${darkMode ? "bg-white opacity-35" : "bg-black opacity-30"}`} >
                <input
                  type="checkbox"
                  checked={selectedForDeletion.includes(index)}
                  onChange={() => { toggleCheckbox(index);; setOpenPage(true) }}
                  className="w-6 h-6 relative bottom-4 right-4 "
                />
              </div>
            )}

          </div>
        ))}
      </div>



    </>
  )
}

export default DisplayAllAzkarNew