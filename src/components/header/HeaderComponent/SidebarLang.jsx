import React from 'react'

function SidebarLang({ darkMode, sidebarLang, }) {

  const sharedClass = ` w-full p-3 rounded-xl duration-300 cursor-pointer text-center hover:text-[#fff] ${darkMode ? "text-[#fff]  hover:bg-[#838383]" : "text-[#22a5ad]  hover:bg-[#22a5ad]"}`

  return (
    <>
      <div className={`sidebarLang z-20 flex-wrap gap-3 p-3 rounded-b-md w-1/2 sm:w-1/4 lg:w-1/5 duration-700 absolute left-0 top-full border ${darkMode ? "bg-[#000] border-[#666]" : "bg-[#fff] border-[#DDD]"}
        ${sidebarLang ? "flex" : "hidden"}
        `}>
        <div className={sharedClass} >
          English
        </div>
        <hr className="w-full border border-[#ddd] " />
        <div
          className={sharedClass}
        >
          Arabic
        </div>
      </div>

    </>
  )
}

export default SidebarLang