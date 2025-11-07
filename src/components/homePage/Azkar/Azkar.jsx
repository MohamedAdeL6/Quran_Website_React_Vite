import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchSpecificAzkar,
  decrementAzkarCount,
  resetAzkarCount,
  storeOriginalCounts,
} from "../../../appStore/slices/SpecificAzkarData.jsx";

import { fetchAzkar } from "../../../appStore/slices/AzkarData";

import { FaArrowUp, } from "react-icons/fa";

import SidebarAzkarSection from "./AzkarComponents/SidebarAzkarSection.jsx";
import ContentAzkarSection from "./AzkarComponents/ContentAzkarSection.jsx";

import Swal from "sweetalert2"; // Import SweetAlert2


function Azkar() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [titleAzkar, seTitleAzkar] = useState("أذكار الصباح والمساء");
  const azkarData = useSelector((state) => state.azkar.data);
  const specificAzkar = useSelector((state) => state.specificAzkar);
  const dispatch = useDispatch();


  // ------------------------------------------------------------
  // function that call all fetching data to show in component
  useEffect(() => {
    dispatch(fetchAzkar());
    dispatch(fetchSpecificAzkar()).then(() => {
      dispatch(storeOriginalCounts());
    });
  }, [dispatch]);


  // ------------------------------------------------------------
  // Function to decrease count
  const handleDecrement = (index) => {
    dispatch(decrementAzkarCount(index));
  };

  // ------------------------------------------------------------
  // Function to Reset count
  const handleReset = (index) => {
    dispatch(resetAzkarCount(index));
  };

  // ------------------------------------------------------------
  // Function disappear Menu When click in any place in window
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!document.querySelector(".parent")?.contains(e.target)) {
        setIsOpen(false);
      }
      if (!document.querySelector(".menuAzkar")?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // -----------------------------------------------------------------------
  // Manage playing audio state
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const playAudio = (index) => {
    // Stop all other audios
    const allAudios = document.querySelectorAll(".audio");
    allAudios.forEach((audio, i) => {
      if (i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    // Play or pause the selected audio
    const currentAudio = document.getElementById(`audio${index}`);
    if (playingAudioId === index) {
      currentAudio.pause();
      setPlayingAudioId(null);
    } else {
      currentAudio.play();
      setPlayingAudioId(index);
    }
  };

  // -----------------------------------------------------------------------
  const [isVisible, setIsVisible] = useState(false);
  // Function To Check Showing Of Btn
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ------------------------------------------------------------------------
  // Function To Go Top Of Page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // -----------------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // ------------------------------------------------------------
  // Function to fetch data with SweetAlert2 loading indicator
  const handleAzkarDataFetch = (el) => {
    // Show SweetAlert2 loading indicator
    Swal.fire({
      title: "جارٍ التحميل...",
      text: "يرجى الانتظار أثناء تحميل الأذكار",
      imageWidth: 100,
      imageHeight: 100,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Dispatch fetch action
    dispatch(fetchSpecificAzkar({ url: el.TEXT, title: el.TITLE }))
      .then(() => {
        // Set the title and close the SweetAlert2 loader after data is fetched
        seTitleAzkar(el.TITLE);
        setIsOpenMenu(false);
        Swal.close(); // Close SweetAlert2 loading
      })
      .catch((error) => {
        Swal.close(); // Close SweetAlert2 loading on error
        Swal.fire("خطأ", "حدث خطأ أثناء تحميل الأذكار", "error", JSON.stringify(error.message));
      });
  };


  // ----------------------------
  useEffect(() => {
    setIsLoading(true); // Start loading
    dispatch(fetchAzkar());
    dispatch(fetchSpecificAzkar()).then(() => {
      dispatch(storeOriginalCounts()); // Store original repeat values
      setIsLoading(false); // Stop loading
    });
  }, [dispatch]);


  return (
    <div className={`flex justify-center items-center pt-2 ${darkMode ? "bg-[#000]" : "bg-[#fff]"}`}>

      <div className="container w-full">

        <div className="w-full flex flex-wrap justify-center items-start gap-5 sm:flex-nowrap" dir="rtl">
          <SidebarAzkarSection
            darkMode={darkMode}
            isOpenSearch={isOpenSearch}
            isOpenMenu={isOpenMenu}
            azkarData={azkarData}
            isLoading={isLoading}
            onClickMenu={() => {setIsOpenSearch(!isOpenSearch); setIsOpenMenu(!isOpenMenu)}}
            onClickSearch={() => setIsOpenSearch(!isOpenSearch)}
            onClickAzkarData={(el) => handleAzkarDataFetch(el)}
          />

          <ContentAzkarSection
            darkMode={darkMode}
            isOpen={isOpen}
            titleAzkar={titleAzkar}
            isLoading={isLoading}
            specificAzkar={specificAzkar}
            playingAudioId={playingAudioId}
            onClickPlayAudio={(id) => playAudio(id)}
            onClickHandleDecrement={(index) => handleDecrement(index)}
            onClickHandleReset={(index) => handleReset(index)}
            onClickSetIsOpen={() => setIsOpen(!isOpen)}
          />


        </div>

      </div>

      <div className="btnUp">
        <button
          onClick={scrollToTop}
          className={`fixed bottom-5 right-[70px] p-3 bg-[#22a5ad] cursor-pointer text-white rounded-full shadow-lg 
            hover:bg-[#5d5d5d] transition-all duration-300 ${isVisible ? "block" : "hidden"}`}
        >
          <FaArrowUp size={20} />
        </button>
      </div>

    </div>
  );
}

export default Azkar;
