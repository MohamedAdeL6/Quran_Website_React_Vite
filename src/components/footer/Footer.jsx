import React from "react";
import { useSelector } from "react-redux";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <footer className={`w-full flex flex-col justify-center items-center border-t ${darkMode ? `bg-black border-[#5d5d5d]` : `bg-white border-gray-300 `}`}>

      <div className="container flex justify-center items-center">

        <div className={`grid grid-cols-1`}>

          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 sm:gap-3 py-5 `} dir="rtl">

            {/* Quran Kareem Section */}
            <div className={`w-full flex flex-wrap items-start content-start gap-5 ${darkMode ? `text-white` : `text-[#22a5ad] `}`}>
              <h2 className="text-2xl font-bold pb-4 border-b border-border_color">القرآن الكريم</h2>
              <p className={`w-full flex flex-wrap justify-center items-center gap-5 ${darkMode ? `text-white` : ``}  `}>
                <span className={`w-full`}>  "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"  </span>
                <span className={`w-full`}> (Surah Al-Qamar 54:17)</span>
              </p>
            </div>

            {/* Quick Links */}
            <div className={`w-full flex flex-wrap justify-start md:justify-center items-center gap-5 ${darkMode ? `text-white` : `text-[#22a5ad] `}`}>

              <div className={`w-full flex flex-wrap justify-start md:justify-center items-center `}>
                <h3 className="text-2xl font-bold pb-4 border-b border-[#5d5d5d]">
                  روابط سريعة
                </h3>
              </div>


              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-1">
                <li>
                  <Link to={`/`} className={` inline-block w-max ${darkMode ? `text-white` : `text-[#000]`} duration-500 hover:text-[#22a5ad]`}>
                    🏠  الرئيسية
                  </Link>
                </li>
                <li>
                  <Link to={`/SoundsQuran`} className={` inline-block w-max ${darkMode ? `text-white` : `text-[#000]`} duration-500 hover:text-[#22a5ad]`}>
                    📖 تلاوة القرآن
                  </Link>
                </li>
                <li>
                  <Link to={`/TafserQuran`} className={` inline-block w-max ${darkMode ? `text-white` : `text-[#000]`} duration-500 hover:text-[#22a5ad]`}>
                    📜 تفسير القرآن
                  </Link>
                </li>
                <li>
                  <Link to={``} className={` inline-block w-max ${darkMode ? `text-white` : `text-[#000]`} duration-500 hover:text-[#22a5ad]`}>
                    📚 الأحاديث
                  </Link>
                </li>
                <li>
                  <Link to={`/SpeceficAzkar`} className={` inline-block w-max ${darkMode ? `text-white` : `text-[#000]`} duration-500 hover:text-[#22a5ad]`}>
                    📚 الأذكار
                  </Link>
                </li>
                <li>
                  <Link to={``} className={` inline-block w-max ${darkMode ? `text-white` : `text-[#000]`} duration-500 hover:text-[#22a5ad]`}>
                    📞 اتصل بنا
                  </Link>
                </li>
              </ul>

            </div>

            {/* Social Media & Contact */}
            <div className={`flex flex-wrap justify-start md:justify-center items-start content-start gap-5 ${darkMode ? `text-white` : `text-[#22a5ad]`}`}>

              <h3 className="flex justify-start md:justify-center text-2xl font-bold border-b pb-4 border-[#5d5d5d] ">
                تابعونا على
              </h3>

              <div className="w-full flex justify-start md:justify-center items-center gap-5 pt-2 ">
                <a href="##" className={` ${darkMode ? `text-white` : ``} hover:text-gray-700 duration-400 text-2xl text-[#22a5ad]`}>
                  <FaFacebook className={``} />
                </a>
                <a href="##" className={` ${darkMode ? `text-white` : ``} hover:text-gray-700 duration-400 text-2xl text-[#22a5ad]`}>
                  <FaTwitter className={``} />
                </a>
                <a href="##" className={` ${darkMode ? `text-white` : ``} hover:text-gray-700 duration-400 text-2xl text-[#22a5ad]`}>
                  <FaInstagram className={``} />
                </a>
                <a href="##" className={` ${darkMode ? `text-white` : ``} hover:text-gray-700 duration-400 text-2xl text-[#22a5ad]`}>
                  <FaYoutube className={``} />
                </a>
              </div>

              <p className={`w-full flex flex-wrap cursor-pointer ${darkMode ? `text-white` : `text-[#22a5ad]`}  duration-500 hover:text-[#22a5ad] text-sm`}>
                <span className={`w-full text-lg flex justify-start md:justify-center`}> : Email 📩  </span>
                <span className={`w-full text-xs flex justify-start md:justify-center`}> mohamedadel.ma.098@gmail.com.com </span>
              </p>

            </div>


          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={`w-full py-2 text-center  border-t  ${darkMode ? `border-[#5d5d5d]` : `border-gray-300`}`}>
        <p className={` ${darkMode ? `text-white` : `text-[#22a5ad]`} text-lg`}>
          © {new Date().getFullYear()} موقع القرآن الكريم. جميع الحقوق محفوظة.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
