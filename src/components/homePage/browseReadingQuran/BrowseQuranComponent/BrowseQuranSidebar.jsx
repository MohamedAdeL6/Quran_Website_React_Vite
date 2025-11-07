import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { FaHome } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import {
  MdMenuBook, MdRadio, MdFavorite, MdOutlineCloudDownload,
  MdCollectionsBookmark, MdLibraryBooks, MdOndemandVideo, MdMapsHomeWork
} from "react-icons/md";


function BrowseQuranSidebar() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const mainLi = [
    { label: "الرئيسية", to: `/`, Icon: FaHome, iconClass: "icon-home" },
    { label: "المفضلة", to: `/`, Icon: MdFavorite, iconClass: "con-favorite" },
    { label: "الإذاعة", to: `/radioFm`, Icon: MdRadio, iconClass: "icon-radio" },
    { label: "تصفح القرآن ", to: `/browseQuran`, Icon: MdMenuBook, iconClass: "icon-menu-book" },
    { label: " التلاوات المرئية  ", to: `/browseReciters`, Icon: MdOndemandVideo, iconClass: "icon-folder-video" },
    { label: " تحميل المصحف  ", to: `/`, Icon: MdOutlineCloudDownload, iconClass: "icon-file-download" },
    { label: " سورة الكهف  ", to: `/browseQuran`, Icon: MdCollectionsBookmark, iconClass: "icon-book" },
    { label: " حصن المسلم  ", to: `/azkar`, Icon: MdLibraryBooks, iconClass: "icon-notebook" },
    { label: " التطبيقات ", to: `/`, Icon: MdMapsHomeWork, iconClass: "icon-store" },
    { label: " تفسير القرآن  ", to: `/tafsir`, Icon: LuNotebookText, iconClass: "icon-tafsir" },
  ]
  return (

    <div className={`w-full hidden sm:sticky top-[71px] right-0 sm:w-[36%] md:w-[33%] xl:w-1/4 2xl:w-[23%] h-[calc(100vh-81px)] sm:flex justify-center items-center  border rounded-md ${darkMode ? "bg-[#000] border border-[#5d5d5d]" : "bg-[#fff] border-[#ddd] "}`}>

      <div className="desktopSidebar h-full flex justify-center items-center">

        <ul className="list-unstyled h-full flex flex-wrap justify-center items-stretch sm:gap-3 xl:gap-2 2xl:gap-5 px-2">
          {mainLi.map((el, index) => {
            return (
              <li
                key={index}
                className={`w-full flex justify-start items-center duration-700 rounded-md   ${darkMode ? "border-[#5d5d5d] text-[#fff] hover:bg-[#22a5ad]" : "text-[#000] border-[#ddd] hover:bg-[#ddd]"}
                  ${mainLi.length -1 === index? "border-0": "border-b"}
                  `}
                dir='rtl'
              >
             
                <Link to={el.to}
                  className="menu-link p-2 flex justify-start items-center gap-3 w-max">
                  <span className={el.iconClass}> <el.Icon /> </span>
                  <span> {el.label} </span>
                </Link>
              </li>
            )
          })
          }
        </ul>
      </div>

    </div>
  )
}

export default BrowseQuranSidebar


