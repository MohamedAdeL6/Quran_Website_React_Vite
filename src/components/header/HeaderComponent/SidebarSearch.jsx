// Import Icons 
import {
  IoSearchOutline,
  IoClose,
} from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";


function SidebarSearch({
  sidebarSearch,
  darkMode,
  inputSearch,
  onClickSetFocusInput,
  focusInput,
  onClickSetSidebarSearch,
  onClickRest,
}) {

  return (
    <>
      <div className={`sidebarSearch z-50 w-full sm:w-[370px] flex-col pt-2 fixed left-0 top-0  h-screen b shadow-inner ${sidebarSearch ? "flex" : "hidden"} 
        ${darkMode ? "bg-[#000] border-r border-[#5d5d5d] rounded-br-md rounded-tr-lg" : "bg-[#fff]"}`}
      >
        <div className={`w-full flex p-2 border-b ${darkMode ? "border-[#505050]" : "border-[#DDD]"}`}>

          <div className="sidebarTopSearch w-full flex items-center justify-between gap-3"
            dir="rtl"
          >
            <div className={`searchSidebarIcon relative p-1 group  rounded-full  
                           ${darkMode ? "hover:bg-[#666666]" : "hover:bg-[#22a5ad]"}`}
            >
              <button className="flex justify-center group-text-[#fff]: items-center duration-1000 hover:rotate-[360deg]">
                <IoSearchOutline className={`icon text-3xl cursor-pointer  hover:text-[#fff] ${darkMode ? "text-[#fff] " : "text-[#22a5ad]"}  `} />
              </button>

              <div className="hidden justify-center items-center group-hover:flex">
                <span
                  className={`absolute left-[50%] translate-x-[-50%] top-[130%] w-max 
                              rounded-xl px-2 py-1 after:content-[''] 
                              after:absolute after:bottom-full after:left-[50%] 
                              after:translate-x-[-50%] after:border-[7px] 
                              after:border-t-transparent after:border-r-transparent after:border-l-transparent                               
                              ${darkMode ? `bg-[#fff] text-[#000] after:border-[#fff]` : `bg-black text-[#fff] after:border-[#000]`}`}
                >
                  بحث
                </span>
              </div>
            </div>

            <div className="sidebarSearchForm w-full flex grow">
              <form className={`flex grow relative rounded-full py-1
                          after:rounded-full before:rounded-full border-r-[3px] border-l-[3px] 
                          duration-100 after:duration-500 before:duration-500  
                          hover:border-l-[3px]  after:content-[''] 
                          after:absolute after:top-0  after:right-3  
                          after:w-1/4 hover:after:w-[calc(100%-25px)] 
                          after:h-[1px] before:absolute before:bottom-0 before:right-3 
                          before:w-1/4 hover:before:w-[calc(100%-25px)] before:h-[1px]
                          ${darkMode ? "border-[#5d5d5d] after:bg-[#5d5d5d] before:bg-[#5d5d5d]" : "border-[#22a5ad] after:bg-[#22a5ad] before:bg-[#22a5ad]"}
                        `}
              >
                <input
                  type="text"
                  className={`w-full flex grow py-[6px] outline-0 pr-5 pl-2 ${darkMode ? "dark:text-[#fff]" : 'text-[#000]'}`}
                  placeholder="بحث"
                  ref={inputSearch}
                  onChange={onClickSetFocusInput}
                />

                <button
                  className={`w-auto absolute top-1/2 transform -translate-y-1/2 px-3 rounded-l-full cursor-pointer hidden
                              ${darkMode
                      ? "bg-[#5d5d5d] text-[#fff] py-[10px] left-[-2px]"
                      : 'bg-[#fff] text-[#000] py-2 left-0'} 
                              ${focusInput ? "dark:flex" : ""}
                              `}
                  type="rest"
                  onClick={onClickRest}
                >
                  مسح
                </button>

              </form>
            </div>

            <div className="micro relative group">
              <button>
                <FaMicrophone
                  className={`iconMicro text-xl cursor-pointer ${darkMode ? "text-[#fff]" : "text-[#22a5ad]"} `}
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
                               ?`bg-[#fff] text-[#000] after:border-[#fff]`
                               :"bg-black text-[#fff] after:border-[#000]"

                    }`}
                >
                  البحث الصوتي
                </span>
              </div>
            </div>

            <div className={`closeSidebarIcon relative p-1 group rounded-full  hover:text-[#fff] ${darkMode ? "bg-[#666666] text-[#fff]" : "text-[#22a5ad] hover:bg-[#22a5ad]"}`}>
              <button
                className="flex justify-center items-center duration-1000 hover:rotate-[360deg] cursor-pointer"
                onClick={onClickSetSidebarSearch}
              >
                <IoClose className="icon-close text-main_hover_color text-3xl" />
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
                              :`bg-black text-[#fff] after:border-[#000]`

                    }`}
                >
                  اغلاق
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default SidebarSearch