import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import imageLight from "./imageNav/navBeforeWhite.png"
import imageDark from "./imageNav/navBeforeBlack.png"
import { Link } from 'react-router-dom';
import { RiMenuFoldLine } from "react-icons/ri";


const NavigationTabs = () => {

  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [menuSetting, setMenuSetting] = useState(false);

  const links = [
    { to: '/browseQuran', label: 'القرآن' },
    { to: '/browseReciters', label: 'صوتيات' },
    { to: '/tafsir', label: 'تفسير' },
    { to: '/radioFm', label: 'الاذاعه' },
    { to: '/azkar', label: 'الأذكار' },
    { to: '/rosaryOnline', label: 'التسبيح الإلكتروني' },
  ]

  const mobileLinkBase =
    'w-full text-[#22a5ad] text-center font-bold text-lg p-2 duration-500 hover:text-white hover:bg-[#22a5ad] border border-[#ddd] rounded-md hover:border-none whitespace-nowrap';

  const mobileDark = darkMode
    ? 'border-[#5d5d5d] text-white hover:bg-[#5d5d5d]' : '';

  return (

    <div className="navigationTabs w-full flex items-center justify-center">

      <div className={`w-full flex justify-center items-center relative`}>

        <nav className={`w-full flex grow items-center justify-between px-5`}>

          <div className={`w-full relative flex items-center justify-between border p-2 rounded-lg md:border-0
              ${darkMode ? "border-[#838383]" : "border-[#ccc] "}
              `}>

            <div className="flex justify-center items-center md:hidden">
              <Link
                title="القرآن الكريم"
                to={`/browseQuran`}
                className={`w-full text-center text-white whitespace-nowrap p-4 
                    text-md font-bold border rounded-lg duration-500
                
                    ${darkMode ? "bg-[#1f2125] border-[#838383] hover:bg-[#838383] " : " border-[#ddd] bg-none hover:bg-[#000]"}`}
              >
                القرآن الكريم
              </Link>
            </div>

            <div className="hidden md:flex md:grow md:items-stretch md:justify-between">

              <img src={darkMode ? `${imageDark}` : `${imageLight}`} className='rotate-180' />

              <ul dir='rtl' className={`flex grow justify-between items-center border-t-2 border-b-2 
                      ${darkMode ? "border-[#22a5ad]" : "border-[#fff] "}
                    `}>

                <li className={`flex grow justify-start items-center `}>
                  <Link
                    title="القرآن الكريم"
                    to={`/browseQuran`}
                    className={`w-full flex flex-wrap justify-center items-center gap-3 font-bold text-white text-center text-xl py-4 duration-500 
                                    rounded-tr-lg rounded-br-lg border-l border-[#fff] 
                                    ${darkMode ? "hover:bg-[#838383]" : "hover:bg-[#000]"}
                                  `}
                    aria-current="page"
                  >
                    <span> القرآن الكريم  </span>
                  </Link>
                </li>

                <li className={`flex grow justify-center items-center`}>
                  <Link
                    title="صوتيات"
                    to={`/browseReciters`}
                    className={`w-full flex flex-wrap justify-center items-center gap-3 font-bold text-white text-center text-xl py-4 duration-500
                         hover:border-[#fff] ${darkMode ? "hover:bg-[#838383]" : " hover:bg-[#000]"}`}
                  >
                    <span> صوتيات  </span>
                  </Link>
                </li>

                <li className={`flex grow justify-center items-center`}>
                  <Link
                    title="تفسير"
                    to={`/tafsir`}
                    className={`w-full flex flex-wrap justify-center items-center gap-3 font-bold text-white text-center text-xl py-4 border-r duration-500 
                         ${darkMode ? "hover:bg-[#838383]" : "hover:bg-[#000]"}`}
                  >
                    <span> تفسير   </span>

                  </Link>
                </li>

                <li className={`flex grow justify-center items-center`}>
                  <Link
                    title=" الإذاعة "
                    to={`/radioFm`}
                    className={`w-full flex flex-wrap justify-center items-center gap-3 font-bold text-white text-center text-xl py-4 border-r duration-500 
                        border-l border-white
                       ${darkMode ? "hover:bg-[#838383]" : "hover:bg-[#000] "}`}
                  >
                    <span> الإذاعة  </span>

                  </Link>
                </li>

                <li className={`flex grow justify-center items-center`}>
                  <Link
                    title="الأذكار"
                    to={`/azkar`}
                    className={`w-full flex flex-wrap justify-center items-center gap-3 font-bold text-white text-center text-xl py-4 border-r border-[#239fb8] duration-500 
                         ${darkMode ? "hover:bg-[#838383]" : "hover:bg-[#000]"}`}
                  >
                    <span> الأذكار  </span>

                  </Link>
                </li>

                <li className={`flex grow justify-center items-center`}>
                  <Link
                    title=" عداد التسبيح الإلكتروني"
                    to={`/rosaryOnline`}
                    className={`w-full flex flex-wrap justify-center items-center gap-3 font-bold text-white text-center text-xl py-4 border-r duration-500 
                        border-[#fff] hover:rounded-tl-lg hover:rounded-bl-lg
                        ${darkMode ? ` hover:bg-[#838383]` : ` hover:bg-[#000]`}`}
                  >
                    <span> التسبيح الإلكتروني </span>

                  </Link>
                </li>

              </ul>

              <img src={darkMode ? `${imageDark}` : `${imageLight}`} className='' />

            </div>

            <div className="flex justify-center md:hidden">
              <button
                type="button"
                className={`relative flex justify-center items-center p-2 text-white cursor-pointer rounded-lg border duration-500 bg-none 
                     ${darkMode ? "hover:bg-[#838383] border-[#5d5d5d] " : "border-[#ddd]  hover:bg-[#000]"}`}
                onClick={() => setMenuSetting(!menuSetting)}
              >
                <RiMenuFoldLine className={`text-xl text-bold`} />
              </button>
            </div>

          </div>

        </nav>

        <div className={`${menuSetting ? `w-full flex justify-center items-center absolute z-9 bottom-[-173px] md:hidden` : `hidden`}`}>

          <div
            className={`w-[93%] flex flex-wrap justify-between items-center gap-1  rounded-lg border 
                      ${darkMode ? 'bg-[#1f2125] border-[#5d5d5d]' : 'bg-white border-[#ddd]'}`}
          >
            <ul className="flex flex-wrap grow justify-between items-center gap-2 p-2 rounded-lg">
              {links.map(({ to, label }) => (
                <li key={to} className="w-[47%] flex justify-center items-center">
                  <Link to={to} title={label} className={`${mobileLinkBase} ${mobileDark}`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  )

}

export default NavigationTabs
