import React from 'react'

// Import Icons 
import {
  IoClose,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";

function SidebarSetting({
  sidebarSetting,
  darkMode,
  onClickSetSidebarSetting,
  onClickDispatchDarkModeFalse,
  onClickDispatchDarkModeTrue,
}) {
  return (
    <>

      <div className={`sidebarSetting z-20 gap-3 w-full sm:w-[370px] flex-col pt-2 fixed left-0 top-0 h-screen border-r ${darkMode ? "bg-[#000] border-[#5d5d5d]" : "bg-[#fff] border-[#c2c2c2]"}  
                  ${sidebarSetting ? "flex" : "hidden"} `}
      >
        <div className={`w-full flex p-[8.5px] border-b ${darkMode ? "border-[#505050]" : "border-[#DDD]"}`}>
          <div
            className="search_sidebar-top w-full flex items-center justify-between gap-5"
            dir="rtl"
          >
            <div className="searchSidebarSearchIcon px-2 duration-700 hover:scale-110">
              <button className="flex items-center cursor-pointer ">
                <span className={`icon text-2xl ${darkMode ? "text-[#fff]" : "text-[#22a5ad]"}`}>
                  الاعدادات
                </span>
              </button>
            </div>

            <div className={`closeSidebarIcon relative p-[7px] group rounded-full 
                        ${darkMode ? "hover:bg-[#666666]" : "hover:bg-[#22a5ad]"}`}
            >
              <button
                className="flex justify-center items-center duration-1000 hover:rotate-[360deg] cursor-pointer"
                onClick={onClickSetSidebarSetting}
              >
                <IoClose
                  className={`icon text-main_hover_color text-3xl  hover:text-white cursor-pointer
                        ${darkMode ? "text-[#fff]" : "text-[#22a5ad]"}`}
                />
              </button>

              <div className="hidden justify-center items-center group-hover:flex">
                <span
                  className={`absolute left-[50%] translate-x-[-50%] top-[130%] w-max 
                            rounded-xl px-2 py-1 after:content-[''] 
                            after:absolute after:bottom-full after:left-[50%] 
                            after:translate-x-[-50%] after:border-[7px] 
                            after:border-t-transparent after:border-r-transparent after:border-l-transparent
                            ${darkMode
                      ? `bg-[#fff] text-[#000] after:border-[#fff]`
                      : `bg-black text-[#fff] after:border-[#000]`}
                          `}
                >
                  اغلاق
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 px-3 ">
          <div className={`w-full flex items-center justify-center p-3 text-xl`}>
            <span className={`py-3 px-4 leading-[1] border rounded-lg 
                    ${darkMode ? `text-[#fff] border-[#505050]` : "text-[#000] border-[#22a5ad]"}`}
            >
              السمة
            </span>
          </div>

          <div className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border 
                  ${darkMode ? "bg-[#212529] border-[#5d5d5d]" : "bg-[#f4f4f4] border-[#22a5ad]"}`}
            dir="rtl"
          >
            <div
              className={`flex justify-between items-center cursor-pointer p-1 rounded-lg 
                    ${darkMode
                  ? "text-[#fff] bg-[#000] border border-[#5d5d5d]"
                  : ""}`}
              onClick={onClickDispatchDarkModeFalse}
            >
              <div className="flex justify-center items-center text-2xl py-[6px] px-2">
                <IoSunnyOutline className={` ${darkMode ? "hidden" : "flex"}`} />
              </div>

              <div
                className={`py-1 px-3 duration-300 rounded-2xl cursor-pointer 
                      ${darkMode ? "text-[#fff]" : "text-[#000]"}`}
              >
                فاتح
              </div>
            </div>

            <div
              className={`flex items-center justify-between p-1  rounded-lg cursor-pointer
                    ${darkMode ? "bg-[#000] text-[#fff] border border-[#5d5d5d]" : ""}`}
              onClick={onClickDispatchDarkModeTrue}
            >
              <div className="flex justify-center items-center text-2xl py-[6px] px-2">
                <IoMoonOutline className={`iconDarkMode  ${darkMode ? "flex text-[#fff]" : "hidden"} `} />
              </div>

              <div
                className={`py-[6px] px-2 duration-300 rounded-2xl cursor-pointer 
                      ${darkMode ? "text-[#fff]" : "text-[#000]"}`}
              >
                داكن
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default SidebarSetting