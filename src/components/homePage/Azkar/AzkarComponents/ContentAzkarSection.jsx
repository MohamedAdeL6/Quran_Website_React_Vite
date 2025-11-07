import React, { useEffect } from 'react'
import {
  FaUndo, FaEdit, FaBold, FaFont, FaPrint,
  FaShareSquare, FaPlay, FaSpinner,
} from "react-icons/fa";
import { BsSliders2 } from "react-icons/bs";
import { MdMotionPhotosPaused } from "react-icons/md";
import { CiCircleMinus } from "react-icons/ci";

import Swal from "sweetalert2";

function ContentAzkarSection({
  darkMode,
  isOpen,
  titleAzkar,
  isLoading,
  specificAzkar,
  playingAudioId,
  onClickPlayAudio,
  onClickHandleDecrement,
  onClickHandleReset,
  onClickSetIsOpen
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

    <div className={`content w-full sm:w-[60%] md:w-2/3 lg:w-3/4 flex flex-wrap justify-center items-center gap- first-letter`}>

      <div className={`w-full flex p-3 rounded-b-lg  border mb-3
                  ${darkMode ? "bg-[#000] border-b border-[#5d5d5d]" : "bg-[#fff] border-[#22a5ad]"}`}>

        <div className={`relative flex flex-wrap justify-center items-center `}>

          <button
            className={`parent p-2 rounded-lg border-2 cursor-pointer ${darkMode
              ? "border-[#5d5d5d] bg-[#000] duration-300 hover:bg-[#5d5d5d]"
              : "bg-[#22a5ad] text-white"}`}
            onClick={onClickSetIsOpen}
          >
            <BsSliders2 className={`text-lg  ${darkMode?"text-white":""}`} />
          </button>

          {isOpen && (
            <ul className={`absolute right-0 top-full mt-2 shadow-lg rounded-lg w-48 
                          ${darkMode ? "bg-[#000] border border-[#5d5d5d] text-white" : "bg-[#fff] text-gray-700"}`}
            >
              <li className={`p-2 border-b flex gap-3 cursor-pointer 
                              ${darkMode ? "hover:bg-white hover:text-black border-[#5d5d5d]" : "border-[#ddd]  hover:bg-gray-200"}`}>
                <FaEdit />
                <span>إظهار التشكيل</span>
              </li>
              <li className={`p-2 border-b  flex gap-3 cursor-pointer 
                              ${darkMode ? "hover:bg-white hover:text-black border-[#5d5d5d]" : "border-[#ddd] hover:bg-gray-200"}`}>
                <FaBold />
                <span>خط عريض</span>
              </li>
              <li className={`p-2 border-b  flex gap-3 cursor-pointer 
                              ${darkMode ? "hover:bg-white hover:text-black border-[#5d5d5d]" : "hover:bg-gray-200 border-[#ddd]"}`}>
                <FaFont />
                <span>حجم الخط: 28px</span>
              </li>
              <li className={`p-2 border-b  flex gap-3 cursor-pointer 
                              ${darkMode ? "hover:bg-white hover:text-black border-[#5d5d5d]" : "hover:bg-gray-200 border-[#ddd]"}`}>
                <FaPrint />
                <span>نسخة للطباعة</span>
              </li>

            </ul>
          )}
        </div>

        <div className={`text-xl flex justify-center items-center font-bold text-center flex-grow `}>
          <h1 className={`w-full flex justify-center items-center text-lg lg:text-3xl 
                      ${darkMode ? "text-[#fff]" : "text-[#22a5ad] "}`}>
            {titleAzkar}
          </h1>
        </div>

      </div>

      <div className={`w-full flex flex-wrap gap-4`}>
        {isLoading ? (
          <div className="w-full flex justify-center items-center py-5">
            <span className="flex justify-center items-center gap-2">
              <span>  جاري التحميل   </span>
              <FaSpinner className="text-4xl text-blue-500 animate-spin" />
            </span>
          </div>
        ) : (
          specificAzkar.data.map((azkar, index) => (
            <div key={index}
              className={`w-full h-full flex flex-wrap justify-between items-start gap-3 rounded-lg lg:flex-nowrap p-3
                        ${darkMode ? "bg-[#000] border border-[#5d5d5d]" : "bg-gray-100 "}`}>

              <div className={`w-full h-full lg:w-3/4 flex flex-wrap justify-between items-between gap-5
                           ${darkMode ? "border border-[#5d5d5d] rounded-md p-2" : ""}`}>

                <p className={`w-full flex text-xl font-bold text-justify 
                            ${darkMode ? "bg-[#000] text-[#fff]" : "bg-gray-100  text-gray-700 "}`}>
                  {azkar.ARABIC_TEXT}
                </p>

                <div className={`w-full flex justify-center items-center`}>

                  <button
                    className={`flex justify-center items-center`}
                    onClick={() => onClickPlayAudio(azkar.ID)}
                  >
                    <audio
                      src={`${azkar.AUDIO}`}
                      id={`audio${azkar.ID}`}
                      className={`audio`}
                    />

                    {playingAudioId === azkar.ID ? (
                      <span className={`flex justify-center items-center gap-4 text-sm font-bold border p-2 rounded-md cursor-pointer ${darkMode ? "border-[#5d5d5d]" : ""}`}>
                        <span className={`w-max ${darkMode ? "text-white border-[#5d5d5d]" : "text-[#22a5ad] border-[#ddd]"}`}>  إيقاف الصوت </span>
                        <span>  <MdMotionPhotosPaused className={`${darkMode ? "text[#fff] " : ""}`} /> </span>
                      </span>
                    ) : (
                      <span className={`flex justify-center items-center gap-4 text-sm font-bold text-red-700 border  p-2 rounded-md cursor-pointer 
                                  ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}>
                        <span className={`w-max ${darkMode ? "text-white" : ""}`}>  تشغيل الصوت </span>
                        <span>  <FaPlay className={`${darkMode ? "text[#fff] " : ""}`} /> </span>
                      </span>
                    )}
                  </button>


                  <span className={`w-full flex justify-end items-end cursor-pointer text-[#22a5ad]`}>
                    <FaShareSquare />
                  </span>

                </div>

              </div>

              <div className={`w-full lg:w-1/4 lg:h-full p-4 rounded-lg flex flex-nowrap lg:flex-wrap items-center gap-5 border 
                          ${darkMode ? `bg-[#000] border border-[#5d5d5d]` : `border-[#ddd]  bg-[#fff]`}`}>

                <div className={`w-1/2 sm:w-full flex justify-center items-center text-3xl font-bold px-3 py-1 border rounded-md
                              ${darkMode ? "bg-[#000] border-[#5d5d5d] text-white" : "bg-[#22a5ad] text-white"}`}>
                  {azkar.REPEAT}
                </div>

                <div className="w-full flex justify-end lg:justify-center items-center gap-5">
                  <button
                    className="cursor-pointer p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    onClick={() => onClickHandleDecrement(index)}
                  >
                    <CiCircleMinus className="text-xl" />
                  </button>
                  <button
                    className="cursor-pointer p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                    onClick={() => onClickHandleReset(index)}
                  >
                    <FaUndo size={19} />
                  </button>
                </div>

              </div>

            </div>

          ))
        )}
      </div>

    </div>
  )
}

export default ContentAzkarSection