import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Import Logo Image
import logoImage from "./assets//images/Logo/logo2.svg";

// Import redux 
import { useDispatch, useSelector } from "react-redux";

// Import setDarkMode() from Store (slice) of Theme
import { setDarkMode } from "../../appStore/slices/Theme";

// Import Components 
import IconWithTooltip from "./HeaderComponent/IconWithTooltip";
import MainNavTabs from "./HeaderComponent/MainNavTabs";
import SidebarSearch from "./HeaderComponent/SidebarSearch";

// Import Icons 
import {
  IoSettingsOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";


// Import Images 
import microphone from "../../assets/images/microphone.gif"
import book from "../../assets/images/openBook.gif"
import ebook from "../../assets/images/ebook.gif";
import home from "../../assets/images/home.gif"
import SidebarSetting from "./HeaderComponent/SidebarSetting";
import SidebarLang from "./HeaderComponent/SidebarLang";
import SidebarIconLogo from "./HeaderComponent/SidebarIconLogo";



const HeaderPage = () => {

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  console.log(darkMode);


  const [sidebarLang, setSidebarLang] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState(false);
  const [sidebarSetting, setSidebarSetting] = useState(false);
  const [focusInput, setFocusInput] = useState(false);
  const [logoImagesSetting, setLogoImagesSetting] = useState(false);

  const inputSearch = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClick = (e) => {
      const sidebarSearchEl = document.querySelector(".sidebarSearch");
      const searchIconEl = document.querySelector(".searchIcon");
      if (
        sidebarSearchEl &&
        searchIconEl &&
        !sidebarSearchEl.contains(e.target) &&
        !searchIconEl.contains(e.target)
      ) {
        setSidebarSearch(false);
      }

      const sidebarSettingEl = document.querySelector(".sidebarSetting");
      const settingIconEl = document.querySelector(".settingIcon");
      if (
        sidebarSettingEl &&
        settingIconEl &&
        !sidebarSettingEl.contains(e.target) &&
        !settingIconEl.contains(e.target)
      ) {
        setSidebarSetting(false);
      }

      const langIconEl = document.querySelector(".langIcon");
      if (langIconEl && !langIconEl.contains(e.target)) {
        setSidebarLang(false);
      }

      const sidebarLogoSettingEl = document.querySelector(".sidebarLogoSetting");
      const logoImagesEl = document.querySelector(".logoIcon");
      if (
        sidebarLogoSettingEl &&
        logoImagesEl &&
        !sidebarLogoSettingEl.contains(e.target) &&
        !logoImagesEl.contains(e.target)
      ) {
        setLogoImagesSetting(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick); // cleanup
    };
  }, []);

  // Function Handle Rest In Sidebar Setting
  const handleRest = (e) => {
    e.preventDefault();
    inputSearch.current.value = ''; setFocusInput(!focusInput)
  }

  return (
    <header
      className={`header w-full flex justify-center items-center border-b sticky left-0 top-0 z-11 ${darkMode ? "bg-black border-[#5d5d5d]" : "bg-white border-[#ddd]"}`}
      dir="rtl"
    >
      <div className="container">

        <div className="headerPartNav w-full flex justify-between items-center py-3 gap-3">

          <div className="flex justify-center items-center">

            <div className="logo flex justify-between gap-2" dir="rtl">

              <div className="logoIcon flex">
                <button
                  className={`p-2 rounded-lg cursor-pointer duration-300 
                    ${darkMode
                      ? "text-white bg-[#000] hover:bg-[#5d5d5d] border border-[#5d5d5d]"
                      : "text-[#fff] bg-[#22a5ad]"}`}
                  onClick={() => setLogoImagesSetting(!logoImagesSetting)}
                >
                  <TfiMenuAlt className={`icon text-2xl ${darkMode && "text-white"}`} />
                </button>
              </div>

              <div className={`logoImage w-[160px] p-2 rounded-lg hidden sm:flex
                ${darkMode
                  ? "bg-[#1f2125] border border-[#5d5d5d] duration-300 hover:bg-[#5d5d5d]"
                  : "bg-[#22a5ad]"}`}>
                <Link to={`/`} className="">
                  <img
                    loading="lazy"
                    src={logoImage}
                    alt="القرآن الكريم"
                    title="موقع القران الكريم"
                    className=""
                  />
                </Link>
              </div>

            </div>

            <SidebarIconLogo
              darkMode={darkMode}
              logoImagesSetting={logoImagesSetting}
              onClickLogoImagesSetting={() => setLogoImagesSetting(!logoImagesSetting)}
            />
          </div>


          <div className="hidden lg:flex lg:grow">
            <nav className="w-full flex grow justify-center items-center ">
              <ul className="flex grow justify-center items-center gap-5">
                <MainNavTabs
                  parentClass="mainPage"
                  to={`/`}
                  image={home}
                  darkMode={darkMode}
                  imageAlt="الـرئـيـسـيـــة"
                  imageTitle="الـرئـيـسـيـــة"
                  label="الـرئـيـسـيـــة"
                />
                <MainNavTabs
                  parentClass="Quran"
                  to={`/browseQuran`}
                  image={book}
                  darkMode={darkMode}
                  imageAttr="القرآن الكريم "
                  label="القرآن الكريم "
                />
                <MainNavTabs
                  parentClass="QuranReciters"
                  to={`/browseReciters`}
                  image={microphone}
                  darkMode={darkMode}
                  imageAttr="القــــــراء"
                  label=" القـــــــراء "
                />
                <MainNavTabs
                  parentClass="QuranTafsir"
                  to={`/tafsir`}
                  image={ebook}
                  darkMode={darkMode}
                  imageAttr="التفسيـــر"
                  label=" التفسيـــر "
                />
              </ul>
            </nav>
          </div>

          <div className="logoIcons flex items-center gap-2">

            <IconWithTooltip
              Icon={IoPersonOutline}
              parentClass="login"
              isLink={true}
              darkMode={darkMode}
              to={`/login`}
              label=" تسجيل الدخول"
            />

            <IconWithTooltip
              Icon={IoGlobeOutline}
              parentClass="langIcon"
              isLink={false}
              darkMode={darkMode}
              to={``}
              onClick={() => setSidebarLang(!sidebarLang)}
              label=" اللغات "
            />

            <IconWithTooltip
              Icon={IoSettingsOutline}
              parentClass="settingIcon"
              isLink={false}
              darkMode={darkMode}
              to={``}
              onClick={() => setSidebarSetting(true)}
              label=" الاعدادات "
            />

            <IconWithTooltip
              Icon={IoSearchOutline}
              parentClass="searchIcon"
              isLink={false}
              darkMode={darkMode}
              to={``}
              onClick={() => setSidebarSearch(true)}
              label=" بحث "
            />

          </div>

        </div>

        <div className="hiddenPartSetting relative">


          <SidebarLang darkMode={darkMode} sidebarLang={sidebarLang} />

          <SidebarSearch
            sidebarSearch={sidebarSearch}
            darkMode={darkMode}
            inputSearch={inputSearch}
            onClickSetFocusInput={() => setFocusInput(true)}
            focusInput={focusInput}
            onClickSetSidebarSearch={() => setSidebarSearch(false)}
            onClickRest={(e) => handleRest(e)}
          />

          <SidebarSetting
            sidebarSetting={sidebarSetting}
            darkMode={darkMode}
            onClickSetSidebarSetting={() => { setSidebarSetting(false) }}
            onClickDispatchDarkModeFalse={() => { dispatch(setDarkMode(false)); }}
            onClickDispatchDarkModeTrue={() => { dispatch(setDarkMode(true)); }}
          />

        </div>

      </div>

    </header>

  );
};

export default HeaderPage;

