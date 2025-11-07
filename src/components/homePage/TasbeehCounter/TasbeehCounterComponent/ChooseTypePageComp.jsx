import React from 'react'

function ChooseTypePageComp({
  setOpenSidebarColor,
  openSidebarColor,
  darkMode,
  setChooseTypePage,
  // eslint-disable-next-line no-unused-vars
  Icon
}) {
  return (
    <>
      {/* Choose Type Page  */}
      <div className="flex justify-start items-start absolute left-0 top-0 z-10">

        {/* Btn To Show Sidebar */}
        <button className=" flex justify-start items-start fixed left-0 top-1/9 z-20"
          onClick={() => setOpenSidebarColor(!openSidebarColor)}>
          <span className='animate-bounce h-9 w-9'>
            <Icon className="sidebarColorIcon text-2xl t-linear-65  text-[#22a5ad] cursor-pointer animate-spin z-20 absolute top-1/4 left-0" />
          </span>
        </button>

        {/* Choose To Type Of Page  */}
        <div className={`sidebarColor flex justify-start items-start fixed left-0 top-1/11 duration-400 w-56 min-h-45 rounded-md text-center border 
                           ${openSidebarColor ? "translate-x-0" : "translate-x-[-400px]"}
                           ${darkMode ? "bg-black border-[#5d5d5d]" : " bg-[#ebf9fa] border-[#ebf9fa] "} `}
        >
          <div className="sticky left-0 top-1/7 flex flex-wrap justify-center items-center gap-3 p-3">

            <button className={`w-full p-3 border  rounded-lg text-center cursor-pointer ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}
              onClick={() => { setChooseTypePage(false) }}>
              <span className={`${darkMode ? "text-white" : "text-black "}`}> العداد بشكل حديث </span>
            </button>

            <button className={`w-full p-3 border  rounded-lg text-center cursor-pointer ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}
              onClick={() => { setChooseTypePage(true) }}>
              <span className={` ${darkMode ? "text-white" : "text-black"}`}> العداد بشكل قديم  </span>
            </button>

          </div>

        </div>

      </div>



    </>
  )
}

export default ChooseTypePageComp