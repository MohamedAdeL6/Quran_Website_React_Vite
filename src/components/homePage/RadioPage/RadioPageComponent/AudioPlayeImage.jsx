import React from 'react'

function AudioPlayerImage({
  darkMode,
  onClickStopOld,
  onClickPlayOld,
  // eslint-disable-next-line no-unused-vars
  IconFaPause
}) {
  return (
    <>
      {/* Audio Player Old */}
      <div className={`w-full sm:w-2/3 lg:w-1/2 h-full flex flex-wrap justify-center items-center gap-1 shadow-md py-1 border 
                    ${darkMode ? "bg-[#000] border border-[#5d5d5d]" : "bg-[#f1f1f1] border-[#ddd] "}`}
        dir='rtl'>

        <div className='w-full flex justify-center items-center gap-2'>
          <span className={`text-md text-[#f00] font-bold`}> ١٩٢  </span>
          <span className={`text-md ${darkMode ? "text-white" : ""}`}> كيلو بايت </span>
        </div>

        <div className={`w-5/6 sm:w-5/6 xl:w-1/2 h-12 px-3  relative flex justify-end items-center border border-[#bebebedd] shadow-md rounded-full overflow-hidden gap-1`}>

          <div className={`absolute left-2/3 top-[3px]`}>
            <img className={`greenRoundIcon hidden`} src="https://hosted.muses.org/2.4.4/ffmp3-repvku-100/statusplay.png" alt='...' />
            <img className={`redRoundIcon`} src="https://hosted.muses.org/2.4.4/ffmp3-repvku-100/statusstop.png" alt='...' />
          </div>

          <button
            title="stop"
            className={`flex justify-center items-center cursor-pointer`}
            onClick={onClickStopOld}
          >
            <audio src="https://stream.radiojar.com/8s5u5tpdtwzuv" className='radioQuranKareem'></audio>
            <img className={`whiteStopIcon`} src="https://hosted.muses.org/2.4.4/ffmp3-repvku-100/Stop.png" alt='...' />
            <img className={`redStopIcon hidden`} src="https://hosted.muses.org/2.4.4/ffmp3-repvku-100/Stopclick.png" alt='...' />
          </button>

          <button
            title="play"
            className={`flex justify-center items-center cursor-pointer`}
            onClick={onClickPlayOld}
          >
            <img className={`whitePlayIcon`} src="https://hosted.muses.org/2.4.4/ffmp3-repvku-100/Playclick.png" alt='...' />
            <IconFaPause className={`greenPlayIcon hidden text-green-600`} />
          </button>

        </div>

      </div>

    </>
  )
}

export default AudioPlayerImage