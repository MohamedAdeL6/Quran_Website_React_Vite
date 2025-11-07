import React from 'react'

function DisplayAllAzkarOld({
  phrases,
  darkMode,
  counters,
  isDeleteMode,
  selectedForDeletion,
  incrementCounter,
  resetCounter,
  toggleCheckbox,
  setOpenPage,
}) {
  return (
    <>
      {/* Display all azkar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" dir="rtl">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className={`relative flex flex-wrap justify-between items-between gap-3 border rounded shadow-lg 
                  ${darkMode ? `border-[#5d5d5d]` : ``}`}
          >
            <h2 className={`w-full text-center text-2xl font-semibold border-b py-4 px-2 
                  duration-200 hover:text-[#22a5ad] ${darkMode ? `text-white bg-black border-[#5d5d5d]` : `text-black bg-[#dedbdb] border-[#ddd]`}`} >
              {phrase}
            </h2>

            <div className="w-full flex justify-center items-center">
              <div className={`w-25 h-25 flex justify-center items-center text-2xl font-bold my-2 text-white rounded-full py-3 bg-zinc-500 cursor-pointer 
                    ${darkMode ? `bg-black border border-[#5d5d5d]` : ``}`}
                onClick={() => incrementCounter(index)}
              >
                {counters[index]}
              </div>
            </div>

            <div className={`w-full flex justify-around items-center gap-4 px-2 py-4 border-t ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd] "}`}>

              <div className=" w-full flex justify-between items-center">
                <button
                  className={`text-white px-3 rounded text-xl leading-loose cursor-pointer bg-blue-500 
                      ${darkMode ? `bg-black border border-[#5d5d5d]` : ``}`}
                  onClick={() => incrementCounter(index)}
                >
                  +
                </button>
                <button
                  className={`text-white px-3 rounded text-xl leading-loose cursor-pointer bg-red-500 
                      ${darkMode ? `bg-black border border-[#5d5d5d]` : ``}`}
                  onClick={() => resetCounter(index)}
                >
                  ⟲
                </button>
              </div>

              {/* Show checkbox in delete mode */}
              {isDeleteMode && (
                <div className={`w-full h-full flex justify-center items-end absolute left-0 top-0
                    ${darkMode ? "bg-white opacity-35" : " bg-black opacity-40"}`} >
                  <input
                    type="checkbox"
                    checked={selectedForDeletion.includes(index)}
                    onChange={() => { toggleCheckbox(index); setOpenPage(true) }}
                    // disabled={index < initialPhrases.length}   
                    className="w-6 h-6 relative bottom-11 right-0 opacity-100 "
                  />

                </div>

              )}


            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default DisplayAllAzkarOld