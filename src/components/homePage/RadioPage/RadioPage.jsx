import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import image from "./RadioPageImage/sddefault.jpg"

import TextImageSection from './RadioPageComponent/TextImageSection';
import AudioPlayerSection from './RadioPageComponent/AudioPlayerSection';

function RadioPage() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // -----------------------------------------------------------------------
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Pause all other audio
    document.querySelectorAll('audio').forEach((el) => {
      if (el !== audio) {
        el.pause();
      }
    });

    // Reset old player icons
    resetOldAudioIcons();

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // -----------------------------------------------------------------------
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  // ----------------------------------------------------------------------
  // Update currentTime and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);


  // ----------------------------------------------------------------------
  //  Format time(seconds to mm: ss)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };


  // -------------------------------------------------------------------------
  const [playRadioIcon, setPlayRadioIcon] = useState(false)

  const showSTopIcon = () => {
    const audio = document.querySelector(".radioQuranKareem");
    audio.pause();

    if (playRadioIcon) {
      document.querySelector('.whitePlayIcon').classList.remove('hidden');
      document.querySelector('.greenPlayIcon').classList.add('hidden');

      document.querySelector('.redRoundIcon').classList.remove('hidden');
      document.querySelector('.greenRoundIcon').classList.add('hidden');

      document.querySelector('.whiteStopIcon').classList.remove('hidden');
      document.querySelector('.redStopIcon').classList.add('hidden');

      setPlayRadioIcon(false);
    }
  };

  // ---------------------------------
  const showPlayIcon = () => {
    const currentAudio = document.querySelector(".radioQuranKareem");

    // Pause all other audio
    document.querySelectorAll("audio").forEach((el) => {
      if (el !== currentAudio) {
        el.pause();
      }
    });

    // Reset new player state
    setIsPlaying(false); // Ensure React state updates if needed

    currentAudio.play();

    document.querySelector('.whitePlayIcon').classList.add('hidden');
    document.querySelector('.greenPlayIcon').classList.remove('hidden');

    document.querySelector('.redRoundIcon').classList.add('hidden');
    document.querySelector('.greenRoundIcon').classList.remove('hidden');

    document.querySelector('.whiteStopIcon').classList.add('hidden');
    document.querySelector('.redStopIcon').classList.remove('hidden');

    setPlayRadioIcon(true);
  };


  // ------------------------------------------------------------------------
  const resetOldAudioIcons = () => {
    document.querySelector('.whitePlayIcon')?.classList.remove('hidden');
    document.querySelector('.greenPlayIcon')?.classList.add('hidden');

    document.querySelector('.redRoundIcon')?.classList.remove('hidden');
    document.querySelector('.greenRoundIcon')?.classList.add('hidden');

    document.querySelector('.whiteStopIcon')?.classList.remove('hidden');
    document.querySelector('.redStopIcon')?.classList.add('hidden');
  };


  return (
    <div className={`w-full flex justify-center items-center  ${darkMode ? 'bg-[#000]' : 'bg-[#fff]'}`}>
      <div className="container w-full">
        <div className={`w-full h-[calc(100vh-71px)] flex justify-center items-center`}>

          <div className={`w-full h-full flex flex-col justify-center items-center `} >

            {/* Text && Image Section  */}
            <TextImageSection
              image={image}
              darkMode={darkMode}
            />

            {/* AudioPlayer Section  */}
            <AudioPlayerSection
              darkMode={darkMode}
              onClickStopOld={() => showSTopIcon()}
              onClickPlayOld={() => showPlayIcon()}
              isPlaying={isPlaying}
              togglePlayFun={() => togglePlay()}
              audioRef={audioRef}
              formatTime={formatTime(currentTime)}
              toggleMuteFun={toggleMute}
              isMuted={isMuted}
              IconFaPlay={FaPlay}
              IconFaPause={FaPause}
              IconFaVolumeUp={FaVolumeUp}
              IconFaVolumeMute={FaVolumeMute}
            />

          </div>

        </div>
      </div>
    </div >
  );
}

export default RadioPage;