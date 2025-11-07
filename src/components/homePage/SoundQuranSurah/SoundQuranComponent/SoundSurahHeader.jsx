import React from 'react'

function SoundSurahHeader({
  darkMode,
  reciterName,
  reciterImage,
}) {
  return (
    <>
      {/* Header Section */}
      <div className={`w-fit p-3 rounded-md flex justify-center items-center gap-5 border  
                          ${darkMode ? "text-white border-[#5d5d5d]" : "border-[#22a5ad] text-[#22a5ad] "}`}>

        <h1 className={`text-2xl sm:text-3xl font-bold`}> {reciterName} </h1>

        <img src={reciterImage} className={`object-cover rounded-lg w-[65px] h-[65px] sm:w-[80px] sm:h-[80px]`} />

      </div>


    </>
  )
}

export default SoundSurahHeader