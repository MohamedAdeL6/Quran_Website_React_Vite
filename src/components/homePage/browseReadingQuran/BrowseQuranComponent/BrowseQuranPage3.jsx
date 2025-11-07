// ✅ BrowseQuranPages2.jsx — React Component

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { LuArrowBigRightDash, LuArrowBigLeftDash } from 'react-icons/lu';

import Swal from 'sweetalert2';

import { fetchSurahOptional, fetchSurahPage } from '../../../../appStore/slices/QuranPagesSlice';

function BrowseQuranPage3() {

  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
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
  const [juzNumber, setJuzNumber] = useState(1);

  const [leftPage, setLeftPage] = useState(1);
  const [rightPage, setRightPage] = useState(2);


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
        showLoading(`الرجاء الانتظار حتي يتم تحميل الجزء ...`);
        try {
          const juzData = await dispatch(fetchSurahPage({ type, selectedNumber: selectedJuz })).unwrap();

          if (juzData?.length > 0) {
            const firstPageNum = juzData[0].page;
            const firstAyahSurah = juzData[0].surah.number;

            setSelectedSurah(firstAyahSurah);
            setJuzNumber(selectedJuz);
            setPage(firstPageNum);

            // Handle left/right pages like Surah selection
            if (firstPageNum % 2 === 1) {
              setLeftPage(firstPageNum);
              setRightPage(firstPageNum + 1);
            } else {
              setRightPage(firstPageNum);
              setLeftPage(firstPageNum - 1);
            }
          }
        } catch (error) {
          console.error("Failed to load Juz data", error);
          Swal.fire("Error", "Failed to fetch Juz", `${JSON.stringify(error.message)}`);
        } finally {
          hideLoading();
        }
      }
    };
    handleJuzSelection();
  }, [selectedJuz, type, dispatch]);

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
      setJuzNumber(result.ayahs[0].juz);

      if (result?.ayahs?.length > 0) {
        const firstPageNum = result.ayahs[0].page;

        // If page is odd, put in right and next page in left
        if (firstPageNum % 2 === 1) {
          setLeftPage(firstPageNum);
          setRightPage(firstPageNum + 1);
        }
        // If page is even, put in left and previous page in right
        else {
          setRightPage(firstPageNum);
          setLeftPage(firstPageNum - 1);
        }

        // Keep page state synced with first page number
        setPage(firstPageNum);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch Surah", `${JSON.stringify(error.message)}`);
    } finally {
      hideLoading();
    }
  };

  // -----------------------------------------------------------------------
  // Handle Next
  const handleNext = async () => {
    const isMobile = window.innerWidth < 1280;
    const step = isMobile ? 1 : 2;

    if (rightPage < 604) {
      const newLeft = leftPage + step;
      const newRight = rightPage + step;
      const newPage = page + step;

      setLeftPage(newLeft);
      setRightPage(newRight);
      setPage(newPage);

      // Show SweetAlert2 loading spinner
      showLoading(' جارِ التحميل الصفحة ');

      // Fetch surah & juz info for the new page
      try {
        const pageData = await dispatch(fetchSurahPage({ type: "page", selectedNumber: newRight })).unwrap()
        if (pageData?.length > 0) {
          const firstAyah = pageData[0];
          setSelectedSurah(firstAyah.surah.number);
          setJuzNumber(firstAyah.juz);
        }
        else {
          console.log("Sorry!, Can't Fetch PageData.");
        }
      } catch (error) {
        console.error("Failed to update Surah/Juz after Next", JSON.stringify(error.message));
      }
      finally {
        // Hide SweetAlert2 loading spinner
        hideLoading();
      }
    }
  };

  // -----------------------------------------------------------------------
  // Handle Back
  const handleBack = async () => {
    const isMobile = window.innerWidth < 1280;
    const step = isMobile ? 1 : 2;

    if (leftPage > 1) {
      const newLeft = leftPage - step;
      const newRight = rightPage - step;
      const newPage = page - step;

      setLeftPage(newLeft);
      setRightPage(newRight);
      setPage(newPage);

        // Show SweetAlert2 loading spinner
      showLoading(' جارِ التحميل الصفحة ');

      // Fetch surah & juz info for the new page
      try {
        const pageData = await dispatch(fetchSurahPage({ type: "page", selectedNumber: `{${isMobile ? newPage : newLeft}`})).unwrap();
        if (pageData?.length > 0) {
          const firstAyah = pageData[0];
          setSelectedSurah(firstAyah.surah.number);
          setJuzNumber(firstAyah.juz);
        }
        else {
          console.log("Sorry!, Can't Fetch PageData.");
        }
      } catch (error) {
        console.error("Failed to update Surah/Juz after Next", JSON.stringify(error.message));
      }
       finally {
        // Hide SweetAlert2 loading spinner
        hideLoading();
      }
    }
  };


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
    <div className={`w-full sm:w-fit lg:w-2/3 xl:w-6/7 2xl:w-[77%] min-h-[calc(100vh-80px)]  flex flex-col gap-3 items-center justify-start px-2 rounded-md  ${darkMode ? "bg-[#000] border-[#5d5d5d]" : "bg-white"}`}>

      <h1 className={`w-full flex justify-start items-center gap-2 py-1 px-2 text-md sm:text-xl md:text-xl font-bold border rounded-sm ${darkMode ? "border-[#5d5d5d] text-[#fff]" : "text-[#22a5ad] border-[#ddd]"}`} dir='rtl'>
        <span> {surahName}</span>   /
        <span> الجزء {juzNumber ? juzNumber : selectedJuz || "-"} </span>  /
        <span> الصفحــة {page} </span>
      </h1>

      {/* Select Boxes */}
      <div className={`w-full flex flex-wrap gap-1 sm:flex-nowrap sm:gap-2 justify-between border p-1 rounded-sm ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`} dir='rtl'>

        <select value={selectedSurah} onChange={(e) => { handleSelection(e); setType("page"); }} className={`w-full lg:w-auto px-2 py-1 rounded-md outline-none border overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-black ${darkMode ? "bg-[#000] text-[#fff] border-[#5d5d5d]" : "bg-[#f1f1f1] border-[#ccc] "}`}>
          <option disabled>اختر السورة</option>
          {surahList.map((surah) => (
            <option key={surah.number} value={surah.number}>{surah.englishName} ({surah.name})</option>
          ))}
        </select>

        <select value={juzNumber ? juzNumber : selectedJuz || ""} onChange={(e) => { setSelectedJuz(Number(e.target.value)); setType("juz"); }} className={`px-4 py-1  rounded-md outline-none border ${darkMode ? "bg-[#000] text-[#fff] border-[#5d5d5d]" : "border-[#ccc] bg-[#f1f1f1] "}`}>
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
      <div className={`w-full flex justify-center items-center shadow-2xl ${darkMode ? "bg-[#000] text-[#fff]" : "bg-white "}`}>
        {
          loadingAyahs ? (
            <p className="text-center text-lg "> Loading Ayahs... </p>
          ) : (
            <>
              {/* For large screens: Two pages */}
              <div className="hidden xl:flex w-full mt-1">
                <img
                  src={`https://quran.ksu.edu.sa/ayat/safahat1/${rightPage}.png`}
                  alt={`Quran Page ${rightPage}`}
                  className="w-1/2 h-auto object-contain "
                />
                <img
                  src={`https://quran.ksu.edu.sa/ayat/safahat1/${leftPage}.png`}
                  alt={`Quran Page ${leftPage}`}
                  className="w-1/2 h-auto object-contain "
                />
              </div>

              {/* For small screens: One page */}
              <div className="xl:hidden w-full">
                <img
                  src={`https://quran.ksu.edu.sa/ayat/safahat1/${rightPage}.png`}
                  alt={`Quran Page ${rightPage}`}
                  className="w-full min-w-[270px] object-contain "
                />
              </div>
            </>
          )
        }
      </div>

      {/* Navigation Buttons */}
      <div className={`w-full flex justify-center items-center gap-9 mt-2`}>
        <button onClick={handleBack} className={`flex justify-center items-center gap-2 px-5 py-1 sm:py-2 md:px-6 rounded-lg font-semibold 
          ${darkMode ? "bg-[#000] border border-[#5d5d5d] text-[#fff] hover:bg-[#5d5d5d]" : ""}
           ${leftPage === 1 || leftPage === 2 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#22a5ad] hover:text-white bg-[#ddd] text-[#22a5ad] cursor-pointer '}`}>
          <LuArrowBigLeftDash /> <span> Back </span>
        </button>

        <button onClick={handleNext} className={`flex justify-center items-center gap-2 px-5 py-1 sm:py-2 md:px-6 rounded-lg font-semibold duration-300  
          ${darkMode ? "bg-[#000] border border-[#5d5d5d] text-[#fff] hover:bg-[#5d5d5d]" : ""}
           ${rightPage === 604 || rightPage === 603 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#22a5ad] hover:text-white bg-[#ddd] text-[#22a5ad] cursor-pointer '}`}>
          <span>Next</span> <LuArrowBigRightDash />
        </button>
      </div>

    </div >
  );
}

export default BrowseQuranPage3;
