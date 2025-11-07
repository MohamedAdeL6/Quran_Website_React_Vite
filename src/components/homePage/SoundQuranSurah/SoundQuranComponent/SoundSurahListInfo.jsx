/* eslint-disable no-unused-vars */
import React from 'react';
import SoundSurahSocialSharing from './SoundSurahSocialSharing';

function SoundSurahListInfo({
  soundSurahs,
  playAudio,
  isPlaying,
  darkMode,
  setMenuSharingSurah,
  setMenuSharingSurahId,
  menuSharingSurah,
  menuSharingSurahId,
  selectedSurahId,
  IconPlay,
  IconPause,
  IconSetting,
}) {

  const sharedClassText = `
      hidden z-20 group-hover:flex p-1 justify-center items-center
      text-sm rounded-lg absolute bottom-[-130%] left-2/3 -translate-x-1/2 w-max
      after:content-[''] after:absolute after:bottom-full after:left-1/2
      after:-translate-x-1/2 after:border-[7px] after:border-t-transparent
      after:border-r-transparent after:border-l-transparent 
      after:border-[#000]
      ${darkMode ? "bg-[#fff] text-[#000]" : "bg-[#000] text-[#fff]"}
    `;

  return (
    <>
      {/* Surahs List Info Section */}
      <ul className="surahList w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5" dir='rtl'>
        {soundSurahs.map((surah) => (
          <li
            key={surah.id}
            className={`surahListItem relative w-full flex justify-between items-center gap-3 py-3 px-2 border rounded-lg ${darkMode ? "border-[#5d5d5d]" : "border-[#22a5ad] "
              }`}
            dir="rtl"
          >
            <button
              className={`relative group p-1 min-w-[2.2rem] min-h-[2.2rem] rounded-md flex justify-center items-center cursor-pointer border duration-100 
                ${darkMode
                ? "bg-[#1f2125] text-[#fff] border-[#5d5d5d] hover:bg-[#22a5ad]"
                : "border-[#22a5ad] bg-[#fff] text-[#22a5ad] hover:bg-[#22a5ad] hover:text-[#fff]"
                }`}
              onClick={() => playAudio(surah.id)}
            >
              {selectedSurahId === surah.id && isPlaying ? (
                <IconPause className="text-xl" />
              ) : (
                <IconPlay className="text-2xl" />
              )}
              <span className={`${sharedClassText} left-[50%]`}>تشغيل</span>
            </button>

            <div className={`relative group flex justify-center items-center min-w-[32px] min-h-[32px] rotate-45 rounded-sm group hover:bg-[#22a5ad]  border  ${darkMode ? "border-[#6e6f6f] bg-[#000]" : "bg-[#fff] border-[#22a5ad]"}`}>
              <span className={`rotate-[-45deg]  group-hover:text-[#fff] ${darkMode ? "text-[#fff]" : "text-[#000]"}`}>
                {surah.numberSoura}
              </span>

              <span className={`${sharedClassText} rotate-[-45deg] left-[70%]`}>
                رقم السورة
              </span>
            </div>

            <div className={`w-fit flex grow flex-col items-start justify-center font-bold text-base  ${darkMode ? "text-[#fff]" : "text-[#000]"}`}>
              <div className="w-max sm:w-fit flex justify-center items-start sm:justify-start mr-1">
                {surah.name}
              </div>
              <div className="hidden sm:flex gap-1 text-xs text-zinc-500 pr-1">
                <span>سورة</span>
                <span>{surah.numberSoura}</span>
              </div>
            </div>

            <div className={`${darkMode ? "text-white" : "text-black"} flex flex-col justify-center items-center group-hover:text-[#22a5ad]  text-base font-bold`}>
              <span className="w-max">
                {surah.numberAyats} {surah.numberAyats > 10 ? "آية" : "آيات"}
              </span>

              <span className="hidden sm:flex text-xs text-zinc-500 pr-1">
                {surah.typeSoura}
              </span>
            </div>

            <button
              className={`relative group cursor-pointer flex justify-center items-center border hover:bg-[#22a5ad] hover:text-white  min-w-[2.2rem] min-h-[2.2rem] rounded 
                ${darkMode 
                ? "text-white bg-black border-[#5d5d5d]" 
                : "bg-white border-[#22a5ad] text-[#22a5ad]"}`}
              onClick={() => {
                setMenuSharingSurah(!menuSharingSurah);
                setMenuSharingSurahId(surah.id);
              }}
            >
              <IconSetting className="text-xl" />
              <span className={sharedClassText}>الإعدادات</span>
            </button>

            <SoundSurahSocialSharing
              darkMode={darkMode}
              menuSharingSurah={menuSharingSurah}
              menuSharingSurahId={menuSharingSurahId}
              index={surah.id}
            />
          </li>
        ))}
      </ul>

    </>
  )
}

export default React.memo(SoundSurahListInfo)

