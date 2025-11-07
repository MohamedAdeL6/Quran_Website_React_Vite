import React from 'react'

import AudioPlayerImage from './AudioPlayeImage';
import AudioPlayerIcon from './AudioPlayerIcon';

function AudioPlayerSection({
  darkMode,
  onClickStopOld,
  onClickPlayOld,
  isPlaying,
  togglePlayFun,
  audioRef,
  formatTime,
  toggleMuteFun,
  isMuted,
  IconFaPlay,
  IconFaPause,
  IconFaVolumeUp,
  IconFaVolumeMute,
}) {

  return (
    <div className='w-full flex flex-col-reverse sm:flex-row justify-center items-center sm:gap-4 mt-2'>

      {/* Audio Player New */}
      <AudioPlayerIcon
        audioRef={audioRef}
        togglePlayFun={togglePlayFun}
        darkMode={darkMode}
        isPlaying={isPlaying}
        formatTime={formatTime}
        IconFaPlay={IconFaPlay}
        IconFaPause={IconFaPause}
        IconFaVolumeUp={IconFaVolumeUp}
        IconFaVolumeMute={IconFaVolumeMute}
        toggleMuteFun={toggleMuteFun}
        isMuted={isMuted}
      />

      {/* Audio Player Old */}
      <AudioPlayerImage
        darkMode={darkMode}
        IconFaPause={IconFaPause}
        onClickStopOld={onClickStopOld}
        onClickPlayOld={onClickPlayOld}
      />


    </div>
  )
}

export default AudioPlayerSection