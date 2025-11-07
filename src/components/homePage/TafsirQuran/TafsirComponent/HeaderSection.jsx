import React from 'react'

function HeaderSection({ darkMode, pageColored }) {
  return (
    <>
      {/* Header Section */}
      <div className={`w-full flex justify-center items-center 
        ${darkMode ? "dark:bg-[#000]" : ""}
        ${pageColored ? "bg-[#dff0d8]" : ""}
        `}
      >
        <div className='w-full container '>
          <h1 className={`text-2xl sm:text-3xl font-bold text-center my-3 sm:my-4 p-4 rounded-md border border-[#ddd]
           ${pageColored ? "border-[#fff] " : ""}       
          ${darkMode ? "dark:text-white dark:border-[#5d5d5d]" : ""}
          `}
          >
            تفسير القرآن الكريم
          </h1>
        </div>
      </div>
    </>
  )
}

export default HeaderSection