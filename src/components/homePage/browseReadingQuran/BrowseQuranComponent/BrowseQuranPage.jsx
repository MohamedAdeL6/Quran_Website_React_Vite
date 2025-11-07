import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import imageLight from "../BrowseQuranImages/imageLight.png";
import imageDark from "../BrowseQuranImages/imageDark.png";

import { MdOutlineZoomOutMap } from "react-icons/md";
import { LuArrowBigRightDash, LuArrowBigLeftDash } from "react-icons/lu";

import {
  fetchSurah,
  fetchSurahSelection,
  fetchJazSelection,
} from '../../../../appStore/slices/QuranReadingData/QuranReadingData';

import Swal from 'sweetalert2';

import { ToastContainer, toast } from 'react-toastify';

function BrowseQuranPage() {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.suraData.data);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // ----------------------------------------------------------------------------
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [surahName, setSurahName] = useState(2);
  const [selectedJuz, setSelectedJuz] = useState(1);
  const [page, setPage] = useState(1);
  const [currentJuz, setCurrentJuz] = useState(null);
  const [sajdaShownForPage, setSajdaShownForPage] = useState(new Set());
  const [surahChangeOrigin, setSurahChangeOrigin] = useState("user");
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [juzNumber, setJuzNumber] = useState(1)

  // -----------------------------------------------------------------------------
  // Fetch surah list on mount
  useEffect(() => {
    const getSurahs = async () => {
      showLoading(' تحميل بيانات السور، الرجاء الانتظار ... ');
      try {
        const result = await dispatch(fetchSurahSelection()).unwrap();
        setSurahList(result);
      } catch (error) {
        Swal.fire("فشل في تحميل قائمة السور", "خطأ", JSON.stringify(error.message))
      }
      finally {
        hideLoading()
      }

    };
    getSurahs();
  }, [dispatch]);

  // --------------------------------------------------------------------------------
  // Fetch surah content when selectedSurah changes
  useEffect(() => {
    const getSurah = async () => {
      setLoadingAyahs(true); // Start loading
      const result = await dispatch(fetchSurah(selectedSurah)).unwrap();
      setSurahName(result.name)

      if (result?.ayahs?.length > 0) {
        if (surahChangeOrigin === "user") {
          setPage(result.ayahs[0].page);  // normal behavior
        }
      }

      setSurahChangeOrigin("user"); // reset
      setLoadingAyahs(false); // Done loading
    };

    getSurah();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSurah, dispatch]);

  // ------------------------------------------------------------------------------
  // Show SweetAlert loading
  const showLoading = (msg) => {
    Swal.fire({
      title: '...... جاري التحميل ',
      text: msg || '...... الرجاء الانتظار حتي يتم التحميل ',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };
  // -----------------------------
  const hideLoading = () => {
    Swal.close();
  };

  // ----------------------------------------------------------------------------
  // Handle Juz selection
  useEffect(() => {
    const handleJuzSelection = async () => {
      if (selectedJuz) {
        try {

          showLoading(`  ..... الرجاء الانتظار حتي يتم تحميل  `);    // Start loading

          const juzData = await dispatch(fetchJazSelection(selectedJuz)).unwrap();
          const firstAyah = juzData.ayahs[0];
          const surahNumber = firstAyah.surah.number;
          const targetPage = firstAyah.page;

          await dispatch(fetchSurah(surahNumber)).unwrap();

          setSurahChangeOrigin("juz");
          setSelectedSurah(surahNumber);
          setPage(targetPage);
          setJuzNumber(null)
        }

        catch (error) {
          console.error("Failed to load Juz data", JSON.stringify(error.message));
          setLoadingAyahs(false);   // Stop loading on error too
          Swal.fire("Error", "Failed to fetch Surah", `${JSON.stringify(error.message)}`);
        }
        finally {
          hideLoading();
        }
      }
    };

    handleJuzSelection();
  }, [selectedJuz, dispatch]);

  // ----------------------------------------------------------------------------
  const handleSelection = async (e) => {
    const selected = Number(e.target.value);
    setSelectedSurah(selected);
    setSelectedJuz(null); // reset Juz
    setSurahChangeOrigin("user");

    showLoading(` الرجاء الانتظار حتي يتم تحميل آيات السورة ..... `)

    try {
      const result = await dispatch(fetchSurah(selected)).unwrap();
      setSurahName(result.name);
      setJuzNumber(result.ayahs[0].juz)

      if (result?.ayahs?.length > 0) {
        setPage(result.ayahs[0].page);
      }
    }
    catch (error) {
      Swal.fire("Error", "Failed to fetch Surah", `${JSON.stringify(error.message)}`);
    }
    finally {
      hideLoading();
    }
  }

  // ----------------------------------------------------------------------------
  const handleNext = async () => {
    const nextPage = page + 1;

    // Try to find ayahs in the current surah data
    const nextAyahs = data?.ayahs?.filter((ayah) => ayah.page === nextPage) || [];

    if (nextAyahs.length > 0) {
      const newJuz = nextAyahs[0].juz;
      if (newJuz !== currentJuz) {
        toast.info(`${newJuz} الجزء `, {
          className: "my-custom-toast",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            background: "#5d5d5d",
            color: "white",
            border: "1px solid #5d5d5d",
            borderRadius: "10px",
          }
        });
        setCurrentJuz(newJuz);
      }

      const hasSajda = nextAyahs.some(
        (ayah) => ayah.sajda === true || typeof ayah.sajda === "object"
      );
      if (hasSajda && !sajdaShownForPage.has(nextPage)) {
        alert(`Sajda is found`);
        setSajdaShownForPage((prev) => new Set(prev).add(nextPage));
      }

      setPage(nextPage);
    } else {
      // Try fetching the next Surah if current one ends
      const nextSurah = selectedSurah + 1;
      if (nextSurah <= 114) {
        try {
          const nextSurahData = await dispatch(fetchSurah(nextSurah)).unwrap();
          if (nextSurahData?.ayahs?.length > 0) {
            setSelectedSurah(nextSurah);
            setSurahChangeOrigin("juz"); // So it doesn’t override page in useEffect
            setPage(nextSurahData.ayahs[0].page);
          }
        } catch (error) {
          console.error("Failed to fetch next Surah:", error);
        }
      }
    }
  };

  // ----------------------------------------------------------------------------
  const handleBack = async () => {
    const prevPage = page - 1;

    const prevAyahs = data?.ayahs?.filter((ayah) => ayah.page === prevPage) || [];

    if (prevPage >= 1 && prevAyahs.length > 0) {

      const newJuz = prevAyahs[0].juz;

      if (newJuz !== currentJuz) {
        toast.info(`${newJuz} الجزء `, {
          className: "my-custom-toast",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            background: "#5d5d5d",
            color: "white",
            border: "1px solid #5d5d5d",
            borderRadius: "10px",
          }
        });
        setCurrentJuz(newJuz);
      }



      const hasSajda = prevAyahs.some(
        (ayah) => ayah.sajda === true || typeof ayah.sajda === "object"
      );
      if (hasSajda && !sajdaShownForPage.has(prevPage)) {
        alert(`Sajda is found`);
        setSajdaShownForPage((prev) => new Set(prev).add(prevPage));
      }

      setPage(prevPage);
    } else {
      // Try fetching previous Surah if beginning is reached
      const prevSurah = selectedSurah - 1;
      if (prevSurah >= 1) {
        try {
          const prevSurahData = await dispatch(fetchSurah(prevSurah)).unwrap();
          if (prevSurahData?.ayahs?.length > 0) {
            setSelectedSurah(prevSurah);
            setSurahChangeOrigin("juz");
            const lastPage = prevSurahData.ayahs[prevSurahData.ayahs.length - 1].page;
            setPage(lastPage);
          }
        } catch (error) {
          console.error("Failed to fetch previous Surah:", error);
        }
      }
    }
  };

  // ---------------------------------------------------------------------------
  const highlightAllah = (text) => {
    const targetWord = /ٱللَّهِ/g;
    return text.split(targetWord).flatMap((part, idx, arr) =>
      idx < arr.length - 1
        ? [<span key={idx}>{part}</span>, <span key={idx + 'allah'} className="text-red-600 font-bold">ٱللَّهِ</span>]
        : [<span key={idx}>{part}</span>]
    );
  };

  // ----------------------------------------------------------------------------
  const ayahsForPage = data
    ? data.ayahs.filter((ayah) => ayah.page === page)
    : [];

  // -----------------------------------------------------------------------------
  const toggleFullScreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };



  return (
    <div className={`w-full sm:w-[64%] md:w-[67%] lg:w-2/3 xl:w-3/4 2xl:w-[77%] min-h-[calc(100vh-80px)]  flex flex-col items-center justify-start px-4 py-2 rounded-md border 
      ${darkMode ? "bg-[#000] border-[#5d5d5d]" : "bg-white border-[#ddd]"}
      `}>

      <h1 className={`w-full flex justify-start items-center gap-2 p-2 text-md sm:text-xl md:text-2xl font-bold mb-4 rounded-md border  
                      ${darkMode ? "border-[#5d5d5d] text-[#fff] " : "text-[#22a5ad] border-[#ddd]"}`}
        dir='rtl'
      >
        <span>  {surahName}  </span> /
        <span>الجزء {currentJuz ? currentJuz : juzNumber ? juzNumber : selectedJuz || "-"}</span> /
        <span>  الصفحــة {page} </span>
      </h1>

      {/* Select Boxes */}
      <div className="w-full flex flex-wrap gap-1 sm:flex-nowrap sm:gap-2 mb-4 justify-between" dir='rtl'>
        <select
          value={selectedSurah}
          onChange={(e) => handleSelection(e)}
          className={`w-full lg:w-auto px-4 py-2 p-1 rounded-md outline-none border 
             overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-black
            ${darkMode ? "bg-[#000] text-[#fff] border-[#5d5d5d] appearance-auto " : "bg-[#f1f1f1] border-[#ccc]"}`}
        >
          <option disabled>Select Surah</option>
          {surahList.map((surah) => (
            <option key={surah.number} value={surah.number}>
              {surah.englishName} ({surah.name})
            </option>
          ))}
        </select>

        <select
          value={currentJuz ? currentJuz : juzNumber ? juzNumber : selectedJuz || "-"}
          onChange={(e) => {
            setSelectedJuz(Number(e.target.value));
          }}
          className={`px-4 py-2 p-1 rounded-md outline-none border
            ${darkMode ? "bg-[#000] text-[#fff] border-[#5d5d5d] appearance-auto" : "bg-[#f1f1f1] border-[#ccc]"}`}
        >
          <option value="">  اختر الجزء ..... </option>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
            <option key={juz} value={juz}>
              الجزء {juz}
            </option>
          ))}
        </select>

        <button
          className={`flex justify-center items-center py-2 px-3 rounded-md cursor-pointer 
              ${darkMode ? "bg-[#000] border border-[#5d5d5d] hover:bg-[#5d5d5d] duration-300" : "bg-[#9fb3b3] text-[#000] hover:text-[#fff]"}`}
          onClick={toggleFullScreen}
        >
          <MdOutlineZoomOutMap className="text-white" />
        </button>
      </div>

      {/* Ayahs Display */}
      <div className={`relative w-full rounded-xl shadow-2xl p-4 space-y-4 ${darkMode ? "bg-[#000] text-[#fff]" : "bg-white"}`}>
        {loadingAyahs ? (
          <p className="text-center text-lg py-6">Loading Ayahs...</p>
        ) : ayahsForPage.length > 0 ? (

          <p dir="rtl" className="text-xl md:text-2xl leading-loose font-[500] text-justify fontFamily">
            {ayahsForPage.map((el) => (
              <span key={el.number}>
                {highlightAllah(el.text)}
                <span
                  className={`relative inline-block w-8 h-9 align-middle`}
                >
                  <img
                    src={darkMode ? imageDark : imageLight}
                    alt={`Ayah ${el.numberInSurah}`}
                    title={`Ayah ${el.numberInSurah}`}
                    className={`w-full h-full `}
                  />
                  <span className={`absolute top-1/2 left-1/2 -translate-y-[41%] -translate-x-1/2 flex items-center justify-center text-[12px] font-bold `}>
                    {el.numberInSurah}
                  </span>
                </span>{" "}
              </span>
            ))}
          </p>
        ) : (
          <p className="text-center text-gray-500 text-lg py-6">Loading Ayahs...</p>
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={handleBack}
          disabled={page === 1}
          className={`flex justify-center items-center gap-2 px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold duration-300 
            ${darkMode ? "bg-[#000] border border-[#5d5d5d] text-[#fff] hover:bg-[#5d5d5d]" : "bg-[#ddd] hover:bg-[#22a5ad] text-[#22a5ad]"}
          ${page === 1 ? ' cursor-not-allowed hover:bg-transparent' : ` hover:text-white  cursor-pointer `}`}
        >
          <span> <LuArrowBigLeftDash /> </span>
          <span> Back </span>

        </button>

        <button
          onClick={handleNext}
          className={`flex justify-center items-center cursor-pointer gap-2 px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold duration-300 
                        ${darkMode ? "bg-[#000] border border-[#5d5d5d] text-[#fff] hover:bg-[#5d5d5d]" : "hover:bg-[#22a5ad] hover:text-white bg-[#ddd] text-[#22a5ad]"}`}
        >
          <span>  Next </span>
          <span> <LuArrowBigRightDash /> </span>
        </button>
      </div>


      {/* Toast Container to hold the toast notifications */}
      <ToastContainer className='' />



    </div>
  );
}

export default BrowseQuranPage;
