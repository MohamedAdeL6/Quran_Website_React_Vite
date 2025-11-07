import { FaSearch, FaSpinner } from "react-icons/fa";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdArrowDropleft } from "react-icons/io";
import { useEffect } from "react";
import Swal from "sweetalert2";

function SidebarAzkarSection({
  darkMode,
  onClickSearch,
  onClickMenu,
  isOpenSearch,
  isOpenMenu,
  azkarData,
  onClickAzkarData,
  isLoading,
}) {

  // -------------------------------------------------------------------------------
  // handling Loading
  useEffect(() => {
    // Combine all loading states you care about
    if (isLoading) {
      Swal.fire({
        title: ' ... جاري التحميل ',
        text: " ...... الرجاء الانتظار حتي يتم التحميل  ",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    } else {
      Swal.close();
    }
  }, [isLoading]);

  return (
    <div className="sidebar w-full sm:w-[40%] md:w-1/3 lg:w-1/4 flex justify-center items-center rounded-lg ">

      <div className={`w-full flex flex-wrap justify-center items-center gap-1 border  rounded-bl-md rounded-br-md
                 ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd] "}`}>

        <header className={`w-full flex flex-wrap justify-start items-center gap-2 p-3  
                   ${darkMode ? "" : ""}`}>

          <h1 className={`w-full text-4xl font-bold  ${darkMode ? "text-[#fff]" : "text-[#000]"}`}>
            حصن المسلم
          </h1>

          <span className={`w-full text-lg  ${darkMode ? `text-gray-400` : `text-gray-600`}`}>
            من أذكار الكتاب والسنة
          </span>

        </header>

        <div className={`menuAzkar w-full relative flex flex-wrap justify-center items-center border-t rounded-sm
                   ${darkMode ? "border-[#5d5d5d] " : "border-[#ddd]"}`}>

          <div className={`w-full relative flex justify-between items-center p-2 border-b  ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}>

            <span className={`text-xl  font-bold mb-1 ${darkMode ? `text-[#fff]` : `text-[#22a5ad]`}`}>
              الفهرس
            </span>

            <button
              className={`hidden justify-center items-center cursor-pointer sm:flex rounded-lg p-[6px]
                         ${darkMode ? "bg-[#000] border border-[#5d5d5d] hover:bg-[#5d5d5d] duration-300" : "text-[#fff] bg-[#22a5ad]"}`}
              onClick={onClickSearch}
            >
              <FaSearch className={`text-2xl ${darkMode?"text-white":""}`} />
            </button>

            <button
              className={`flex justify-center items-center cursor-pointer sm:hidden rounded-lg p-[6px]
                         ${darkMode ? "bg-[#000] border border-[#5d5d5d] hover:bg-[#5d5d5d] duration-300" : "text-[#fff] bg-[#22a5ad]"}`}
              onClick={onClickMenu}
            >
              <AiOutlineMenuUnfold className={`text-2xl ${darkMode?"text-white":""}`} />
            </button>

            <div className={`absolute left-[59%] rounded-md top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 bg-[#fff]  justify-center items-center
                       ${isOpenSearch ? "flex" : "hidden"}`}

            >
              <input type="search" placeholder="search" className={`w-full px-2 py-[5px] border rounded-md focus:border-[#5d5d5d] focus:outline-0
                         ${darkMode ? " bg-[#000] text-white border border-[#5d5d5d]" : "border-[#ddd]"}`} />
            </div>

          </div>

          <div className={`w-full sm:flex sm:flex-wrap p-2 border sm:border-0 rounded-md mt-2 gap-1 
                     ${darkMode ? "bg-[#000] border-[#666]" : "border-[#ddd] bg-[#fff]"}
                         ${isOpenMenu ? `flex flex-wrap absolute left-0 top-full z-10` : `hidden`}`}>

            {isLoading ? (
              <div className="w-full flex justify-center items-center py-5">
                <span className="flex justify-center items-center gap-2">
                  <span>  جاري التحميل   </span>
                  <FaSpinner className="text-4xl text-blue-500 animate-spin" />
                </span>
              </div>
            ) : (azkarData.map((el, index) => (
              <button
                key={index}
                to={`/specificAzkar`}
                className={`w-full flex justify-start items-center gap-3 p-2 border rounded-sm cursor-pointer 
                          ${darkMode ? "text-[#fff] hover:text-[#fff] border-[#666] duration-300 hover:bg-[#5d5d5d]" : "text-[#000] border-[#ddd] hover:bg-gray-100 "}`}
                onClick={() => onClickAzkarData(el)}
              >
                <span>  <IoMdArrowDropleft /> </span>
                <h3 className={`text-right `}>{el.TITLE}</h3>
              </button>
            ))
            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default SidebarAzkarSection