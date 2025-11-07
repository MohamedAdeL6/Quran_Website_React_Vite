/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTafsirsInfo } from "../../../appStore/slices/TafsirQuran/TafsirsInformation";
import { fetchAllSurahs } from "../../../appStore/slices/TafsirQuran/SurahsQuran";
import { fetchAllVersesQuran } from "../../../appStore/slices/VersesQuran";
import { fetchTafsirVersesQuran } from "../../../appStore/slices/TafsirQuran/TafsirVersesQuran";

import imageDark from "./TafsirQuranImages/imageDark.png"
import imageLight from "./TafsirQuranImages/imageLight.png"

import { IoSettingsSharp } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";


import SelectionTafsirInputs from "./TafsirComponent/SelectionTafsirInputs";
import AyahsDisplaySection from "./TafsirComponent/AyahsDisplaySection";
import TafsirSurahNameBarSection from "./TafsirComponent/TafsirSurahNameBarSection";

import HeaderSection from "./TafsirComponent/HeaderSection";
import TafsirHeaderBtnDisplay from "./TafsirComponent/TafsirHeaderBtnDisplay";
import ChooseTypePageTafsir from "./TafsirComponent/ChooseTypePageTafsir";
import ScrollTopArrowComp from "./TafsirComponent/ScrollTopArrowComp";
import SingleTafsirAyah from "./TafsirComponent/TafsirVersesView/SingleTafsirAyah";
import AllTafsirAyahs from "./TafsirComponent/TafsirVersesView/AllTafsirAyahs";

import Swal from 'sweetalert2';

const TafsirQuran = () => {

  const dispatch = useDispatch()

  const darkMode = useSelector((state) => state.darkMode.darkMode);
  // -----------------------------------------------------------------------------
  let { loading, tafsirInfo, error } = useSelector((state) => state.tafsirInfo)
  let surahsList = useSelector((state) => state.surahsQuran.allSurahs)
  let versesList = useSelector((state) => state.versesQuran.allVerses)
  let { tafsirLoading, tafsirError } = useSelector((state) => state.tafsirVerses)
  let tafsirVerses = useSelector((state) => state.tafsirVerses.tafsirVerses)

  // -----------------------------------------------------------------------------
  const [selectedTafsirLang, setSelectedTafsirLang] = useState("");
  const [selectedTafsirName, setSelectedTafsirName] = useState("");
  const [selectTafsirSlug, setSelectTafsirSlug] = useState("")

  // -----------------------------------------------------------------------------
  const [selectSurahName, setSelectSurahName] = useState("");
  const [selectSurahNumber, setSelectSurahNumber] = useState("")

  // ----------------------------------------------------------------------------
  const [fromAyah, setFromAyah] = useState('')
  const [toAyah, setToAyah] = useState('')

  // ----------------------------------------------------------------------------
  const [displayingAllTafsir, setDisplayingAllTafsir] = useState(true)

  // ---------------------------------------------------------------------------
  useEffect(() => {
    dispatch(fetchAllSurahs())
  }, [dispatch, selectedTafsirLang])

  // ---------------------------------------------------------------------------
  useEffect(() => {
    dispatch(fetchTafsirsInfo(selectedTafsirLang))
  }, [selectedTafsirLang])

  // ----------------------------------------------------------------------------
  //Check If Aya && surah Valid
  const isAyaValid = (sura, fromAya, toAya) => {
    const selected = surahsList.find((item) => item.number === parseInt(sura));
    return (
      selected && fromAya >= 1 && toAya <= selected.numberOfAyahs && fromAya <= toAya
    );
  };
  isAyaValid()

  // -----------------------------------------------------------------------------
  // Function execute When click btn
  const showData = () => {

    if (!selectSurahNumber) {
      Swal.fire({
        icon: 'error',
        title: ' ! الرجاء اختيار  اسم السورة  ',
        text: error || tafsirError,
      });
      alert("❌ Please select a Surah number.");
      return;
    }

    if (!fromAyah || !toAyah) {
      Swal.fire({
        icon: 'error',
        title: ' ! الرجاء تحديد  الآيات  ',
        text: error || tafsirError,
      });
      return;
    }

    if (!selectedTafsirLang) {
      Swal.fire({
        icon: 'error',
        title: ' ! الرجاء اختيار لغة التفسير  ',
        text: error || tafsirError,
      });
      return;
    }

    if (!selectedTafsirName) {
      Swal.fire({
        icon: 'error',
        title: ' الرجاء اختيار اسم التفسير ',
      });
      return;
    }

    const from = parseInt(fromAyah);
    const to = parseInt(toAyah);

    if (!isAyaValid(selectSurahNumber, from, to)) {
      Swal.fire({
        icon: 'error',
        title: ' ! هذا النطاق من الآيات غير صالح  ',
        text: " يرجي اختيار الايآت من الأصغر إلي الأكبر ",
      });
      return;
    }

    // Show SweetAlert2 loading
    Swal.fire({
      title: '... جاري التحميل',
      text: "يرجى الانتظار حتي يتم تحميل الآيــــــات وتفسيرها",
      allowOutsideClick: false, // Prevent closing the alert
      didOpen: () => {
        Swal.showLoading(); // Show loading spinner
      },
    });

    // Clear previous verses before fetching new ones
    dispatch({ type: "VersesQuran/clearAllVerses" });

    // Fetch the new data
    dispatch(fetchAllVersesQuran({ fromAyah, toAyah, selectSurahNumber }))
      .then(() => {
        // Fetch tafsir data as well
        return dispatch(fetchTafsirVersesQuran({ selectTafsirSlug, selectSurahNumber, fromAyah, toAyah }));
      })
      .finally(() => {
        // Close SweetAlert2 loading spinner after the fetch completes
        Swal.close();
      });
  }

  // ------------------------------------------------------------------------------
  // tafsirVerses to unique tafsir verses
  const renderedAyahs = new Set(); // persist across re-renders 

  // -------------------------------------------------------------------------------
  // ------ Choose Color Of Page
  const [openSidebarColor, setOpensSidebarColor] = useState(false)
  const [pageColored, setPageColored] = useState(false)
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


  // -------------------------------------------------------------------------------
  // handling Loading
  useEffect(() => {
    // Combine all loading states you care about
    const isLoading = loading || tafsirLoading;

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
  }, [loading, tafsirLoading]);


  // -------------------------------------------------------------------------------
  // handling Error
  useEffect(() => {
    if (error || tafsirError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || tafsirError,
      });
    }
  }, [error, tafsirError]);


  // --------------------------------------------------------------------------------
  // part of scroll in tafsir
  const [currentPage, setCurrentPage] = useState(0);
  // -------------------------
  // ----- Scroll Visibility Handler
  const [isVisible, setIsVisible] = useState(false)
  // -----------------------
  // Scroll Visibility Handler
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  // --------------------------
  // Scroll to Top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });




  return (

    <div className={`w-full min-h-[calc(100vh-80px)] flex justify-center items-center relative pb-3 ${darkMode ? "bg-[#000]" : "bg-[#f4f4f4]"}`}>
      <div className={` w-full h-full flex flex-col justify-center items-center relative ${darkMode ? "py-2" : ""}`}>

        {/* Header Section */}
        <HeaderSection darkMode={darkMode} pageColored={pageColored} />

        {/* Selection Section */}
        <SelectionTafsirInputs
          darkMode={darkMode}
          selectSurahName={selectSurahName}
          surahsList={surahsList}
          fromAyah={fromAyah}
          toAyah={toAyah}
          selectedTafsirLang={selectedTafsirLang}
          tafsirInfo={tafsirInfo}
          loading={loading}
          error={error}
          selectedTafsirName={selectedTafsirName}
          pageColored={pageColored}
          onChangeFromAyah={(e) => setFromAyah(e.target.value)}
          onChangeToAyah={(e) => setToAyah(e.target.value)}
          onClickSubmit={() => { showData() }}
          onChangeLang={(e) => { setSelectedTafsirLang(e.target.value) }}
          setSelectedTafsirName={setSelectedTafsirName}
          setSelectTafsirSlug={setSelectTafsirSlug}
          setSelectSurahName={setSelectSurahName}
          setSelectSurahNumber={setSelectSurahNumber}
        />

        {/* Tafsir Name && Soura Name Section */}
        <TafsirSurahNameBarSection
          darkMode={darkMode}
          selectSurahName={selectSurahName}
          selectedTafsirName={selectedTafsirName}
          fromAyah={fromAyah}
          toAyah={toAyah}
          pageColored={pageColored}
        />

        {/* Ayahs Display */}
        <AyahsDisplaySection
          loading={loading}
          error={error}
          versesList={versesList}
          imageDark={imageDark}
          imageLight={imageLight}
          darkMode={darkMode}
          pageColored={pageColored}
        />

        {/* Tafsir Display Section */}
        {/* Tafsir Header && Btn Display */}
        <TafsirHeaderBtnDisplay
          pageColored={pageColored}
          darkMode={darkMode}
          setDisplayingAllTafsir={setDisplayingAllTafsir}
          displayingAllTafsir={displayingAllTafsir}
        />

        {/* Tafsir Verses Display */}
        <div className={`w-full flex justify-center items-center  
          ${pageColored ? "bg-[#d9edf7] " : ""}
          ${darkMode ? "bg-black" : ""}`}
        >

          {displayingAllTafsir ?
            <AllTafsirAyahs
              darkMode={darkMode}
              tafsirLoading={tafsirLoading}
              tafsirError={tafsirError}
              tafsirVerses={tafsirVerses}
              renderedAyahs={renderedAyahs}
              versesList={versesList}
              pageColored={pageColored}
              selectedTafsirLang={selectedTafsirLang}
            />
            :
            < SingleTafsirAyah
              darkMode={darkMode}
              tafsirLoading={tafsirLoading}
              tafsirError={tafsirError}
              tafsirVerses={tafsirVerses}
              renderedAyahs={renderedAyahs}
              versesList={versesList}
              currentPage={currentPage}
              pageColored={pageColored}
              selectedTafsirLang={selectedTafsirLang}
              setCurrentPage={setCurrentPage}
            />
          }

        </div>

      </div>

      {/* Choose Type Page Of Tafsir */}
      <ChooseTypePageTafsir
        setOpensSidebarColor={setOpensSidebarColor}
        openSidebarColor={openSidebarColor}
        darkMode={darkMode}
        setPageColored={setPageColored}
        Icon={IoSettingsSharp}
      />


      {/* Scroll To Top Arrow Component */}
      <ScrollTopArrowComp darkMode={darkMode} isVisible={isVisible} Icon={FaArrowUp} scrollToTop={scrollToTop} />


    </div>

  );
};

export default TafsirQuran;




