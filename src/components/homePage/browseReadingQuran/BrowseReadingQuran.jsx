import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import BrowseQuranSidebar from './BrowseQuranComponent/BrowseQuranSidebar';
import ChooseTypePageReading from "./BrowseQuranComponent/ChooseTypePageReading"

import BrowseQuranPage3 from './BrowseQuranComponent/BrowseQuranPage3';
import BrowseQuranPage4 from './BrowseQuranComponent/BrowseQuranPage4';
import BrowseQuranPage from './BrowseQuranComponent/BrowseQuranPage';

function BrowseReadingQuran() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // -------------------------------------------------------------------------------
  // ------ Choose Color Of Page
  const [openSidebarColor, setOpensSidebarColor] = useState(false)
  const [pageColoredYellow, setPageColoredYellow] = useState(false)
  const [pageColoredBlue, setPageColoredBlue] = useState(false)

  // -----------------------
  useEffect(() => {
    const handleClick = (e) => {
      const sidebarColorEl = document.querySelector(".sidebarColor");
      const searchColorIconEl = document.querySelector(".sidebarColorIcon");
      if (
        sidebarColorEl &&
        searchColorIconEl &&
        !sidebarColorEl.contains(e.target) &&
        !searchColorIconEl.contains(e.target)
      ) {
        setOpensSidebarColor(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick); // cleanup
    };
  }, []);


  return (

    <div className={`w-full flex justify-center items-center ${pageColoredBlue ? "bg-[#000]" : ""} ${darkMode ? "bg-[#000]" : "bg-white"}`}>

      <div className={`container`}>

        <div className='w-full flex flex-nowrap gap-3 py-2 relative'>

          {pageColoredBlue ? <BrowseQuranPage4 /> : pageColoredYellow ? <BrowseQuranPage3 /> : <BrowseQuranPage />}

          <BrowseQuranSidebar />

        </div>


        <ChooseTypePageReading
          darkMode={darkMode}
          setOpensSidebarColor={setOpensSidebarColor}
          openSidebarColor={openSidebarColor}
          setPageColoredYellow={setPageColoredYellow}
          setPageColoredBlue={setPageColoredBlue}
        />
      </div>

    </div>

  )
}

export default BrowseReadingQuran


