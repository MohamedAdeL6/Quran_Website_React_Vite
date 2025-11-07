import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import SoundSurahHeader from "./SoundQuranComponent/SoundSurahHeader";
import SoundSurahListInfo from "./SoundQuranComponent/SoundSurahListInfo";
import SoundSurahVisibleArrow from "./SoundQuranComponent/SoundSurahVisibleArrow";

import Swal from "sweetalert2";

import { FaArrowUp } from "react-icons/fa";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import {
  setSelectedSurahIdSlice,
  setIsPlayingSlice,
  setAudioSources,
  setCurrentAudioSrc,
} from "../../../appStore/slices/AudioPlayerSlice";


function SoundQuranSurah() {

  const dispatch = useDispatch();

  // -------------------------------------------------------------
  //  ------ Redux state
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const soundSurahs = useSelector((state) => state.soundQuran.value);
  const reciters = useSelector((state) => state.quranReciters.data);
  const audioSources = useSelector((state) => state.audioPlayer.audioSources);
  const selectedSurahId = useSelector((state) => state.audioPlayer.selectedSurahId);
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);

  // -------------------------------------------------------------------
  const [menuSharingSurah, setMenuSharingSurah] = useState(false);
  const [menuSharingSurahId, setMenuSharingSurahId] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  // -------------------------------------------------------------------
  const { newStyle } = useParams();
  const reciterName = newStyle ? newStyle.split("-")[0] : "";
  const reciterStyle = newStyle ? newStyle.split("-")[1]?.toLowerCase() : "";

  // -------------------------------------------------------------------
  // ------- Get Image Of Reciter
  const reciterImage = reciters.find(
    (reciter) => reciter.name === reciterName
  )?.image;

  // --------------------------------------------------------------------
  // Set audio sources once (only if not set yet)
  useEffect(() => {
    if (Object.keys(audioSources).length === 0 && soundSurahs.length > 0) {
      const sources = soundSurahs.reduce((acc, surah) => {
        const src = surah.RecitersQuran?.[reciterName]?.[reciterStyle] || "";
        acc[surah.id] = src;
        return acc;
      }, {});
      dispatch(setAudioSources(sources));
    }
  }, [audioSources, soundSurahs, reciterName, reciterStyle, dispatch]);

  // --------------------------------------------------------------------
  // Handle play/pause per surah click
  const playAudio = (surahId) => {
    const reciter = reciterName;
    const style = reciterStyle;

    if (surahId === selectedSurahId) {
      // If same surah clicked, just toggle play/pause
      dispatch(setIsPlayingSlice(!isPlaying));
    } else {
      // New surah selected
      const src = soundSurahs.find(s => s.id === surahId)?.RecitersQuran?.[reciter]?.[style];
      if (!src) return;

      dispatch(setSelectedSurahIdSlice(surahId));
      dispatch(setCurrentAudioSrc(src));
      dispatch(setIsPlayingSlice(true));

      // Optional: update audioSources map
      dispatch(setAudioSources({
        ...audioSources,
        [surahId]: src
      }));
    }
  };

  //---------------------------------------------------------------------
  // Scroll to top logic
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // ---------------------------------------------------------------------
  // ------- loaded 
  useEffect(() => {
    if (!soundSurahs || soundSurahs.length === 0) {
      Swal.fire({
        title: "جاري تحميل السور...",
        text: "يرجى الانتظار حتى يتم تحميل جميع السور",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [soundSurahs]);


  return (
    <div className={`w-full flex justify-center items-center  ${darkMode ? "bg-[#000]" : "bg-[#fff]"}`}>

      <div className="container">

        <div className="w-full overflow-hidden flex flex-wrap justify-center items-center gap-5 py-3">

          {/* Header section Of Surah List  */}
          <SoundSurahHeader
            darkMode={darkMode}
            reciterName={reciterName}
            reciterImage={reciterImage}
          />

          {/* Surahs List Info Section */}
          <SoundSurahListInfo
            soundSurahs={soundSurahs}
            playAudio={playAudio}
            isPlaying={isPlaying}
            darkMode={darkMode}
            setMenuSharingSurah={setMenuSharingSurah}
            setMenuSharingSurahId={setMenuSharingSurahId}
            menuSharingSurah={menuSharingSurah}
            menuSharingSurahId={menuSharingSurahId}
            selectedSurahId={selectedSurahId}
            IconPlay={IoIosPlay}
            IconPause={IoIosPause}
            IconSetting={PiDotsThreeOutlineVerticalFill}
          />

        </div>

      </div>


      {/* Visible Arrow Scroll To Up Page */}
      <SoundSurahVisibleArrow
        isVisible={isVisible}
        scrollToTop={scrollToTop}
        IconArrowUp={FaArrowUp}
      />

    </div>
  );
}

export default SoundQuranSurah;
