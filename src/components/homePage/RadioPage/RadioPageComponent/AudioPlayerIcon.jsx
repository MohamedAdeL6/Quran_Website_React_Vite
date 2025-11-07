/* eslint-disable no-unused-vars */
import React from 'react'

function AudioPlayerIcon({
  audioRef,
  togglePlayFun,
  darkMode,
  isPlaying,
  formatTime,
  IconFaPlay,
  IconFaPause,
  isMuted,
  IconFaVolumeUp,
  IconFaVolumeMute,
  toggleMuteFun,


}) {
  return (
    <>

      {/* Audio Player New */}
      <div className='w-full flex justify-center items-center'>

        <div className={`w-full px-5 py-8 shadow-md flex items-center gap-4 ${darkMode ? "bg-[#000] border border-[#5d5d5d]" : "bg-[#f1f1f1]"}`}>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src="https://stream.radiojar.com/8s5u5tpdtwzuv"
            preload="metadata"
          />

          {/* Play/Pause */}
          <button
            onClick={() => togglePlayFun()}
            className="text-black text-2xl focus:outline-none"
          >
            {isPlaying ? <IconFaPause className={`cursor-pointer ${darkMode ? "text-white" : ""}`} /> : <IconFaPlay className={`cursor-pointer ${darkMode ? "text-white" : ""}`} />}
          </button>

          {/* Timer */}
          <span className={`text-sm w-12 text-center cursor-pointer ${darkMode ? "text-white" : " text-gray-700"}`}>{formatTime}</span>

          {/* Progress Bar */}
          <div className="relative flex-grow h-1 bg-gray-400 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full bg-[#000] animate-pulse ${isPlaying ? `w-${Math.ceil(Math.random() * 150)}` : 'w-0'
                } transition-all duration-300`}
            ></div>
          </div>


          {/* Volume Icon */}
          <div
            onClick={toggleMuteFun}
            className={`text-xl cursor-pointer ${darkMode ? "text-white" : "text-gray-700 "}`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <IconFaVolumeMute />

            ) : (
              <IconFaVolumeUp className="line-through" />
            )}
          </div>


        </div>

      </div>

    </>
  )
}

export default AudioPlayerIcon