
import { IoMdShare, IoIosLink, IoMdCloudDownload } from "react-icons/io";
import { MdOutlineFavoriteBorder, MdOutlinePlaylistAdd } from "react-icons/md";
import { BsExclamationTriangleFill } from "react-icons/bs";
import React from "react";

function SoundSurahSocialSharing({
  darkMode,
  menuSharingSurah,
  menuSharingSurahId,
  index,
}) {


  const grandParentClass = `w-[calc(100%-60px)] absolute left-13 top-1/2 -translate-y-1/2 duration-300 border  rounded-lg z-10
                            ${darkMode ? "bg-[#000] border-[#5d5d5d] text-white" : "border-[#22a5ad] text-black  bg-white"}  
                            ${menuSharingSurah && menuSharingSurahId === index ? `translate-x-0` : `translate-x-[-1800px]`}
                            `
  const grandParent = `group relative flex justify-center items-center`

  const sharedClassIcon = ` flex justify-center items-center min-w-[30px] min-h-[30px] rounded-md duration-300 text-[#22a5ad] hover:bg-[#22a5ad] hover:text-white text-xl cursor-pointer border
                            ${darkMode ? "border-[#5d5d5d]" : " border-[#22a5ad]"}
                          `
  const sharedClassText = `hidden z-20 group-hover:flex p-1 justify-center items-center text-sm rounded-lg absolute bottom-[-130%] left-1/2 -translate-x-1/2 w-max after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-[7px] after:border-t-transparent after:border-r-transparent after:border-l-transparent after:border-[#000]
                            ${darkMode ? "bg-[#fff] text-[#000]" : " bg-[#000] text-[#fff]"}
                          `
  return (
    <>
      <div className={grandParentClass}>

        <div className={`w-full grid grid-cols-6 px-2 py-[.57rem] rounded-md`}>

          <div className={grandParent}>
            <span className={sharedClassIcon}> <IoMdShare /></span>
            <span className={sharedClassText}> مشاركة </span>
          </div>

          <div className={grandParent}>
            <span className={sharedClassIcon}> <IoIosLink /> </span>
            <span className={sharedClassText}>  نسخ الرابط  </span>
          </div>

          <div className={grandParent}>
            <span className={sharedClassIcon}>  <IoMdCloudDownload /> </span>
            <span className={sharedClassText}>  تحميل   </span>
          </div>

          <div className={grandParent}>
            <span className={sharedClassIcon}>  <MdOutlinePlaylistAdd />  </span>
            <span className={sharedClassText}>  أضف إلي مكتبتي الصوتية  </span>
          </div>

          <div className={grandParent}>
            <span className={sharedClassIcon}> <MdOutlineFavoriteBorder /> </span>
            <span className={sharedClassText}>  أضف الي المفضلة  </span>
          </div>

          <div className={grandParent}>
            <span className={sharedClassIcon}>  <BsExclamationTriangleFill />  </span>
            <span className={sharedClassText}>  الإبلاغ عن خطأ أو خلل   </span>
          </div>

        </div>

      </div>

    </>
  )
}

export default React.memo(SoundSurahSocialSharing);