import React, { useRef } from 'react'

function AudioPlayerSoundSurah({
  isAudioSouraOpen,
  indexSoura,
  duration,
  handleSliderChange,
  handlePreviousSeconds,
  togglePlayPause,
  isPlaying,
  handleForwardSeconds,
  toggleMute,
  isMuted,
  closeAudioSoura,
  currentTime,
  // eslint-disable-next-line no-unused-vars
  Icons
}) {
    const audioRefs = useRef([]);
  return (
    <>
      {isAudioSouraOpen && (
        <div className='w-full flex flex-wrap justify-center items-center'> 
        {/* Header Section  */}
        <div className='w-full flex justify-center items-center'>
        <h1> سورة البقرة  </h1>
        </div>
        <div className="fixed bottom-0 w-full bg-gray-200 p-4">
          {/* Display the current audio */}
          {audioRefs.current[indexSoura] && (
            <>
              <div className="flex justify-between text-sm">
                <span>
                  {new Date(currentTime * 1000)
                    .toISOString()
                    .substring(14, 19)}
                </span>
                <span>
                  {new Date(duration * 1000).toISOString().substring(14, 19)}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime || 0}
                onChange={handleSliderChange}
                className="inputName w-full h-2 rounded-lg cursor-pointer"
              />

              <div className="flex justify-center gap-4 mt-2">

                <button onClick={() => handlePreviousSeconds()} className="cursor-pointer">
                  <Icons.TbPlayerTrackNextFilled className="cursor-pointer" />
                </button>

                <button onClick={togglePlayPause}>
                  {isPlaying ? <Icons.FaPause className="cursor-pointer" /> : <Icons.FaPlay className="cursor-pointer" />}
                </button>

                <button onClick={handleForwardSeconds} className="cursor-pointer">
                  <Icons.TbPlayerTrackNextFilled className="rotate-180 cursor-pointer" />
                </button>

                <button onClick={toggleMute}>
                  {isMuted ? <Icons.VscMute className="cursor-pointer" /> : <Icons.VscUnmute className="cursor-pointer" />}
                </button>

                <button
                  onClick={closeAudioSoura}
                  className={`p-2 duration-300 hover:bg-[#5d5d5d] hover:text-[#fff] rounded-lg text-lg`}
                >
                  <Icons.IoMdClose className="cursor-pointer" />
                </button>

              </div>
            </>
          )}
        </div>
        </div>
      )}

    </>
  )
}

export default AudioPlayerSoundSurah