// ✅ BrowseQuranPages2.jsx — React Component

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { LuArrowBigRightDash, LuArrowBigLeftDash } from 'react-icons/lu';

import Swal from 'sweetalert2';

import { fetchSurahOptional, fetchSurahPage } from '../../../../appStore/slices/QuranPagesSlice';

function BrowseQuranPage2() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.suraData.data);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [surahName, setSurahName] = useState("");
  const [selectedJuz, setSelectedJuz] = useState(1);
  const [page, setPage] = useState(1);
  const [surahChangeOrigin, setSurahChangeOrigin] = useState("user");
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [type, setType] = useState("page");
  const [juzNumber, setJuzNumber] = useState(1)

  // -----------------------------------------------------------------------
  // fetch All  surahs
  useEffect(() => {
    const getSurahs = async () => {
      showLoading('تحميل بيانات السور، الرجاء الانتظار ...');
      try {
        const result = await dispatch(fetchSurahOptional()).unwrap();
        setSurahList(result);
      } catch (error) {
        Swal.fire("فشل في تحميل قائمة السور", "خطأ", JSON.stringify(error.message));
      } finally {
        hideLoading();
      }
    };
    getSurahs();
  }, [dispatch]);


  // -----------------------------------------------------------------------
  // fetch surahs Name
  useEffect(() => {
    const getSurah = async () => {
      setLoadingAyahs(true);
      try {
        const result = await dispatch(fetchSurahOptional(selectedSurah)).unwrap();
        setSurahName(result.name);
      } catch (error) {
        Swal.fire("فشل في تحميل السورة", "خطأ", JSON.stringify(error.message));
      } finally {
        setSurahChangeOrigin("user");
        setLoadingAyahs(false);
      }
    };
    getSurah();
  }, [selectedSurah, surahChangeOrigin, dispatch]);


  // ----------------------------------------------------------------------
  // Handle Juz Selection 
  useEffect(() => {
    const handleJuzSelection = async () => {
      if (selectedJuz) {
        try {
          showLoading(`الرجاء الانتظار حتي يتم تحميل الجزء ...`);
          const juzData = await dispatch(fetchSurahPage({ type, selectedNumber: selectedJuz })).unwrap();
          const pageNum = juzData[0].page
          setPage(pageNum);
          setJuzNumber(null)
          const firstPageAyahs = juzData
          if (firstPageAyahs?.length > 0) {
            const firstAyahSurah = firstPageAyahs[0].surah.number;
            setSelectedSurah(firstAyahSurah);
          }
          setJuzNumber(null)
        } catch (error) {
          console.error("Failed to load Juz data", JSON.stringify(error.message));
          setLoadingAyahs(false);
          Swal.fire("Error", "Failed to fetch Surah", `${JSON.stringify(error.message)}`);
        } finally {
          hideLoading();
        }
      }
    };
    handleJuzSelection();
  }, [selectedJuz, type, surahList, data, dispatch]);

  // -----------------------------------------------------------------------
  // Handle Surah Selection 
  const handleSelection = async (e) => {
    const selected = Number(e.target.value);
    setSelectedSurah(selected);
    setSurahChangeOrigin("user");
    showLoading(`الرجاء الانتظار حتي يتم تحميل آيات السورة ...`);

    try {

      const result = await dispatch(fetchSurahOptional(selected)).unwrap();

      setSurahName(result.name);
      setJuzNumber(result.ayahs[0].juz)

      if (result?.ayahs?.length > 0) {
        setPage(result.ayahs[0].page);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch Surah", `${JSON.stringify(error.message)}`);
    } finally {
      hideLoading();
    }
  };

  // -----------------------------------------------------------------------
  const handleNext = async () => {
    if (page < 604 && page > 0)
      setPage((prev) => prev + 1)
  };

  // ------------------------------------------------------------------------
  const handleBack = async () => {
    if (page <= 604 && page > 0)
      setPage((prev) => prev - 1)
  };


  // -------------------------------------------------------------------------
  const showLoading = (msg) => {
    Swal.fire({
      title: '...... جاري التحميل ',
      text: msg || '...... الرجاء الانتظار حتي يتم التحميل ',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  };

  // -------------------------------------------------------------------------
  const hideLoading = () => Swal.close();


  // --------------------------------------------------------------------------
  const toggleFullScreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };



  return (
    <div className={`w-full sm:w-fit min-h-[calc(100vh-80px)] flex flex-col items-center justify-start px-2 pt-2 rounded-md border  ${darkMode ? "bg-[#000] border-[#5d5d5d]" : "bg-white border-[#ddd]"}`}>

      <h1 className={`w-full flex justify-start items-center gap-2 p-2 text-md sm:text-xl md:text-2xl font-bold mb-4 border rounded-md ${darkMode ? "border-[#5d5d5d] text-[#fff]" : "text-[#22a5ad] border-[#ddd]"}`} dir='rtl'>

        <span>
          {surahName}</span> / <span>الجزء {juzNumber ? juzNumber : selectedJuz || "-"}</span> / <span>الصفحــة {page}</span>
      </h1>

      {/* Select Boxes */}
      <div className="w-full flex flex-wrap gap-1 sm:flex-nowrap sm:gap-2 mb-4 justify-between" dir='rtl'>

        <select value={selectedSurah} onChange={(e) => { handleSelection(e); setType("page"); }} className={`w-full lg:w-auto px-4 py-2 p-1 rounded-md outline-none  border  overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-black ${darkMode ? "bg-[#000] text-[#fff] border-[#5d5d5d]" : "bg-[#f1f1f1] border-[#ccc]"}`}>
          <option disabled>اختر السورة</option>
          {surahList.map((surah) => (
            <option key={surah.number} value={surah.number}>{surah.englishName} ({surah.name})</option>
          ))}
        </select>

        <select value={juzNumber ? juzNumber : selectedJuz || ""} onChange={(e) => { setSelectedJuz(Number(e.target.value)); setType("juz"); }} className={`px-4 py-2 p-1 rounded-md outline-none  border  ${darkMode ? "bg-[#000] text-[#fff] border-[#5d5d5d]" : "border-[#ccc] bg-[#f1f1f1]"}`}>
          <option value="">اختر الجزء .....</option>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
            <option key={juz} value={juz}>الجزء {juz}</option>
          ))}
        </select>

        <button onClick={toggleFullScreen} className={`flex justify-center items-center py-2 px-3 rounded-md cursor-pointer  ${darkMode ? "bg-[#000] border border-[#5d5d5d] hover:bg-[#5d5d5d]" : "bg-[#9fb3b3] text-[#000] hover:text-[#fff]"}`}>
          <MdOutlineZoomOutMap className="text-white" />
        </button>

      </div>

      {/* Ayahs Display (Image) */}
      <div className={`w-full flex justify-center items-center rounded-xl shadow-2xl p-4 ${darkMode ? "bg-[#000] text-[#fff]" : " bg-white"}`}>
        {loadingAyahs ? (
          <p className="text-center text-lg "> Loading Ayahs... </p>
        ) : (
          <img src={`https://quran.ksu.edu.sa/ayat/safahat1/${page}.png`}
            alt={`Quran Page ${page}`}
            className="min-w-[300px] w-full lg:w-5/6 xl:w-[556px] " />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 my-3">
        <button onClick={handleBack} disabled={page === 1} className={`flex justify-center items-center gap-2 px-5 py-1 sm:py-2 md:px-6 md:py-3 rounded-lg font-semibold ${darkMode ? "bg-[#000] border border-[#5d5d5d] text-[#fff] hover:bg-[#5d5d5d]" : ""} ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#22a5ad] hover:text-white bg-[#ddd] text-[#22a5ad] cursor-pointer '}`}>
          <LuArrowBigLeftDash /> <span> Back </span>
        </button>

        <button onClick={handleNext} className={`flex justify-center items-center gap-2 px-5 py-1 sm:py-2 md:px-6 md:py-3 rounded-lg font-semibold duration-300  ${darkMode ? "bg-[#000] border border-[#5d5d5d] text-[#fff] hover:bg-[#5d5d5d]" : ""} ${page === 604 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#22a5ad] hover:text-white bg-[#ddd] text-[#22a5ad] cursor-pointer '}`}>
          <span>Next</span> <LuArrowBigRightDash />
        </button>
      </div>

    </div>
  );
}

export default BrowseQuranPage2;
