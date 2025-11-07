import React from 'react'

function ChooseTypePageTafsir({
  setOpensSidebarColor,
  openSidebarColor,
  darkMode,
  setPageColored,
  // eslint-disable-next-line no-unused-vars
  Icon
}) {
  return (
    <>
      {/* Choose Type Page Of Tafsir */}
      <div className="flex justify-start items-start absolute left-0 top-0 z-10">

        <button className="flex justify-start items-start fixed left-0 top-1/9 z-20"
          onClick={() => setOpensSidebarColor(!openSidebarColor)}
        >
          <span className='flex justify-center items-center animate-bounce w-7 h-8  '>
            <Icon className={`sidebarColorIcon text-2xl t-linear-65  cursor-pointer animate-spin z-20 absolute top-1/4 left-0 ${darkMode?"text-white":"text-black"}`} />
          </span>
        </button>

        <div className={`sidebarColor flex justify-start items-start fixed left-0 top-16 duration-400 w-56 min-h-45 rounded-md text-center border  
                ${openSidebarColor ? "translate-x-0" : "translate-x-[-400px]"}
                ${darkMode ? "bg-black border-[#5d5d5d]" : "border-[#ebf9fa] bg-[#22a5ad]"} `} >

          <div className="fixed left-0 top-1/5 flex flex-wrap justify-center items-center gap-3 p-3">

            <button className="w-full p-3 border border-[#ddd] text-white rounded-xl text-center cursor-pointer"
              onClick={() => { setPageColored(true) }}>
              <span> الصفحة ملونة </span>
            </button>

            <button className="w-full p-3 border border-[#ddd] text-white rounded-xl text-center cursor-pointer"
              onClick={() => { setPageColored(false) }}>
              <span> الصفحة غير ملونه </span>
            </button>

          </div>

        </div>

      </div>

    </>
  )
}

export default ChooseTypePageTafsir