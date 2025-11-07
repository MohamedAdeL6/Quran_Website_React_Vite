import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPlayingSlice, setIsMuted, setSelectedSurahIdSlice } from '../../appStore/slices/AudioPlayerSlice';
import { FaPause, FaPlay } from 'react-icons/fa';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { MdOutlineReplay } from "react-icons/md";
import { VscUnmute, VscMute } from "react-icons/vsc";
import { IoMdClose, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Swal from 'sweetalert2';

// ------- Helper function to format time (HH:MM:SS or MM:SS)
const formatTime = (seconds) => {
  if (isNaN(seconds)) return "00:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return hrs > 0
    ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    : `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AudioPlayerBarGlobal2 = () => {

  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const { selectedSurahId, isPlaying, isMuted, audioSources } = useSelector((state) => state.audioPlayer);
  const soundSurahs = useSelector((state) => state.soundQuran.value);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const surahInfo = soundSurahs.find(el => el.id === selectedSurahId);
  const audioSrc = selectedSurahId ? audioSources[selectedSurahId] : null;

  // ------------------------------ Helper functions
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openInfo, setOpenInfo] = useState(false);
  const [volume, setVolume] = useState(isMuted ? 0 : 1); // Set initial volume based on mute state
  const [openVolumeControl, setOpenVolumeControl] = useState(false)



  // -----------------------------------------------------------------------------------
  function findReciterByUrl(obj, url) {
    const reciters = obj.RecitersQuran;
    for (const [reciter, types] of Object.entries(reciters)) {
      for (const [recitationType, audioUrl] of Object.entries(types)) {
        if (audioUrl.trim() === url.trim()) {
          return { reciter, recitationType };
        }
      }
    }
    return null;
  }
  // ------ identify variable
  let result = null;
  // ------- resolve undefined result
  if (surahInfo && audioSrc) result = findReciterByUrl(surahInfo, audioSrc);


  // ------------------------------------------------------------------------------------
  // ------- Handle audio control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    audio.muted = isMuted;
    audio.volume = volume;

    if (isPlaying && audio.paused) {
      audio.play().catch(() => { });
    } else if (!isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [isPlaying, isMuted, audioSrc, volume]);

  // -----------------------------------------------------------------------------------
  // ------- Update currentTime every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime || 0);
        setDuration(audioRef.current.duration || 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------------------------------------------------
  // ------- Handle progress bar change (seek)
  const handleSeek = (e) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  // ---------------------------------------------------------------------------------------
  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (newVolume === 0) {
      dispatch(setIsMuted(true)); // Mute when volume is 0
    } else {
      dispatch(setIsMuted(false)); // Unmute when volume is greater than 0
    }
  };

  // ---------------------------------------------------------------------------------------
  if (!selectedSurahId || !audioSrc) return null;

  return (
    <div className={`fixed bottom-0 left-0 w-full  border-t  shadow-lg z-10 p-3 py-2 rounded-md
       ${darkMode ? " bg-[#000] border-[#5d5d5d]" : "border-gray-300 bg-[#fff]"}`}>
      <div className={`w-full flex flex-wrap justify-center items-center`}>

        <div className='relative w-full flex flex-wrap justify-center items-center duration-300 mb-2'>

          <button
            onClick={() => setOpenInfo(!openInfo)}
            className={`w-full flex justify-start items-center text-2xl cursor-pointer `}>
            {
              openInfo
                ?
                <IoIosArrowUp className={`text-2xl ${darkMode ? "text-white hover:rounded-sm hover:bg-[#5d5d5d] duration-300" : ""}`} />
                :
                <IoIosArrowDown className={`text-2xl ${darkMode ? "text-white hover:rounded-sm hover:bg-[#5d5d5d] duration-300" : ""}`} />
            }

          </button>

          <div className={`w-full flex flex-col sm:flex-row-reverse justify-center items-center gap-6 duration-500
            ${openInfo ? `relative translate-y-0 mb-7` : `absolute translate-y-[1000px]`}`}>
            <h1 className={`w-fit text-center text-lg sm:text-2xl border rounded-md p-3
              ${darkMode ? "text-white border-[#5d5d5d]" : "border-[#ccc]  text-black"}`}>
              القارئ : {result.reciter}
            </h1>

            <h1 className={`w-fit text-center text-xl sm:text-2xl border rounded-sm p-3 
              ${darkMode ? "text-white border-[#5d5d5d]" : "text-black border-[#ddd]"}`}>
              سورة :  {surahInfo.name}
            </h1>
          </div>

        </div>

        <div className={`w-full flex flex-wrap justify-between items-center `}>
          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="1"
            value={currentTime}
            onChange={handleSeek}
            className={`slider w-full h-2 rounded-lg cursor-pointer ${darkMode ? "darkMode" : ""}`}
            style={{
              '--progress': `${(currentTime / duration) * 100}%`,
              direction: 'rtl',
            }}
          />

          {console.log(currentTime)}
          {console.log(duration)}

          {/* Time Display */}
          <div className="w-full flex justify-start items-center gap-2 text-xs min-w-[130px] mt-2">
            <span className={`w-full ${darkMode ? "text-white" : ""}`}>{formatTime(duration)}</span>
            <span className={`w-full text-end ${darkMode ? "text-white" : ""}`}>{formatTime(currentTime)}</span>
          </div>
        </div>

        <div className="w-full flex justify-center items-center gap-1 sm:gap-4 md:gap-6 xl:gap-10">

          {/* Rewind 10s */}
          <button
            className={`cursor-pointer p-1 border rounded-sm duration-400 hover:text-white
              ${darkMode
                ? "text-white border-[#5d5d5d] hover:bg-[#5d5d5d]"
                : "border-[#22a5ad] hover:bg-[#22a5ad] "}`}
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
              }
            }}>
            <span className="flex justify-center items-center gap-2">
              <TbPlayerTrackPrevFilled className='text-lg' />
              <span className='text-sm'> -10s </span>
            </span>
          </button>

          {/* Play/Pause */}
          <button className={`cursor-pointer p-1 border rounded-sm duration-400 hover:text-white 
              ${darkMode
              ? "text-white border-[#5d5d5d] hover:bg-[#5d5d5d]"
              : "border-[#22a5ad] hover:bg-[#22a5ad] "}`}
            onClick={() => dispatch(setIsPlayingSlice(!isPlaying))}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* Forward 10s */}
          <button
            className={`cursor-pointer p-1 border rounded-sm duration-400 hover:text-white
              ${darkMode
                ? "text-white border-[#5d5d5d] hover:bg-[#5d5d5d]"
                : "border-[#22a5ad] hover:bg-[#22a5ad] "}`}
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = Math.min(
                  audioRef.current.currentTime + 10,
                  audioRef.current.duration || 0
                );
              }
            }}>
            <span className="flex justify-center items-center gap-2">
              <TbPlayerTrackNextFilled className='text-lg' />
              <span className='text-sm'> +10s </span>
            </span>
          </button>

          {/* Volume */}
          <div className='relative flex flex-col-reverse justify-center items-center'>
            {/* Volume Control */}
            <button
              className={`cursor-pointer p-1 border rounded-sm duration-400 hover:text-white 
              ${darkMode
                  ? "text-white border-[#5d5d5d] hover:bg-[#5d5d5d]"
                  : "border-[#22a5ad] hover:bg-[#22a5ad] "}`}
              onClick={() => { setOpenVolumeControl(!openVolumeControl); }}
            >
              {volume > 0 ? <VscUnmute /> : <VscMute />}
            </button>

            {/* Volume Slider */}
            {isMuted || volume > 0 ? (
              <div className={` absolute left-0 -top-[200%] w-[150px] flex justify-center items-center py-5 px-2 bg-[#fff] shadow rounded-md
              ${openVolumeControl ? "flex" : "hidden"}`}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="sliderVolume w-full max-w-[150px] slider h-2 rounded-lg cursor-pointer transition-all ease-in-out duration-200"
                  style={{
                    background: `linear-gradient(to left, #000 ${volume * 100}%, #ccc ${volume * 100}%)`,
                  }}
                />
              </div>

            ) : null}
          </div>

          {/* Restart */}
          <button className={`cursor-pointer p-1 border rounded-sm duration-400 hover:text-white 
              ${darkMode
              ? "text-white border-[#5d5d5d] hover:bg-[#5d5d5d]"
              : "border-[#22a5ad] hover:bg-[#22a5ad] "}`}
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
                dispatch(setIsPlayingSlice(true));
              }
            }}>
            <MdOutlineReplay className='text-lg' />
          </button>

          {/* Stop and Hide Player */}
          <button className={`cursor-pointer p-1 border rounded-sm duration-400 hover:text-white 
              ${darkMode
              ? "text-white border-[#5d5d5d] hover:bg-[#5d5d5d]"
              : "border-[#22a5ad] hover:bg-[#22a5ad] "}`}
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
              dispatch(setSelectedSurahIdSlice(null));
              dispatch(setIsPlayingSlice(false));
            }}>
            <IoMdClose className='text-xl' />
          </button>

          {/* Hidden global audio element */}
          <audio
            ref={audioRef}
            src={audioSrc}
            preload="auto"
            autoPlay
            onLoadStart={() => {
              Swal.fire({
                title: "جاري تحميل السورة...",
                text: "يرجى الانتظار",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
            }}
            onCanPlayThrough={() => {
              Swal.close(); // Audio is ready
            }}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onEnded={() => dispatch(setIsPlayingSlice(false))}
            onError={() => {
              Swal.fire({
                icon: "error",
                title: "خطأ في التشغيل",
                text: "تعذر تحميل الملف الصوتي، حاول مرة أخرى.",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerBarGlobal2;
