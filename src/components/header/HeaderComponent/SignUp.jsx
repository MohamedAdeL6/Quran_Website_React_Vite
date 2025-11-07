
import { FaSignInAlt, FaFacebook, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import imageLogo from "../assets/images/Logo/DesignLogo.jpeg"

function SignUp() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (

    <div className={`w-full  flex justify-center items-center ${darkMode ? "bg-[#000]" : "bg-[#fff]"}`}>
     
    <div className='container'>

        <div className="w-full h-[calc(100vh-71px)] flex flex-wrap sm:flex-nowrap justify-center items-center py-3 sm:py-7" dir='rtl'>

          <div className={`w-full sm:h-[-webkit-fill-available] sm:w-auto flex justify-center items-center rounded-lg border ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}  `}>
            <div className={`w-full flex flex-wrap justify-center items-center gap-2 sm:gap-9 py-5  pb-4`}>
              <span className={`w-full flex flex-wrap justify-center items-center text-2xl font-bold 
                    ${darkMode ? "text-white" : "text-black"}`}>
                تسجيل الدخول إلى موقع
              </span>
              <div className={`w-full flex flex-wrap justify-center items-center text-2xl font-bold gap-2 ${darkMode ? `text-white` : `text-black`}`}>
                <span> Quran.com  </span>
                <img src={imageLogo} height={50} width={50} className='rounded-xl' />
              </div>
            </div>
          </div>

          <div className={`sm:h-[-webkit-fill-available] sm:w-[500px] flex flex-wrap justify-center items-center gap-3 sm:gap-7 p-3 sm:py-[20px] rounded-lg border ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}>

            <form className="inputSignin w-full flex flex-wrap gap-4 sm:gap-7 ">

              <div className="w-full flex justify-between items-center">

                <div className="input w-[47%] flex">
                  <div className="w-full flex items-center justify-center gap-3 ">
                    <input type="text" name="frName" className={`w-full border rounded-lg p-2 text-start outline-0 ${darkMode ? "bg-[#000] border-[#5d5d5d] text-[#fff]" : "text-[#000] bg-[#fff] border-[#ddd]"}`} id="frName" placeholder=" الأسم الأول" />
                  </div>
                </div>

                <div className="input w-[47%] flex">
                  <div className="w-full flex items-center justify-center gap-3 ">
                    <input type="text" name="lsName" className={`w-full border rounded-lg p-2 text-start outline-0 ${darkMode ? "bg-[#000] border-[#5d5d5d] text-[#fff]" : "text-[#000] bg-[#fff] border-[#ddd]"}`} id="lsName" placeholder="الأسم الأخير" />
                  </div>
                </div>

              </div>

              <div className="w-full flex justify-between items-center">

                <div className="input w-[48%] flex">
                  <div className="w-full flex items-center justify-center gap-3 ">
                    <input type="password" name="password" className={`w-full border rounded-lg p-2 text-start outline-0 ${darkMode ? "bg-[#000] border-[#5d5d5d] text-[#fff]" : "text-[#000] bg-[#fff] border-[#ddd]"}`} id="password" placeholder="كلمة السر " />
                  </div>
                </div>

                <div className="input w-[48%] flex">
                  <div className="w-full flex items-center justify-center gap-3 ">
                    <input type="password" name="rePassword" className={`w-full border rounded-lg p-2 text-start outline-0 ${darkMode ? "bg-[#000] border-[#5d5d5d] text-[#fff]" : "text-[#000] bg-[#fff] border-[#ddd]"}`} id="rePassword" placeholder="تأكيد كلمة السر " />
                  </div>
                </div>
              </div>

              <div className="input w-full flex">
                <div className="w-full flex items-center justify-center gap-3 ">
                  <input type="email" name="email" className={`w-full border rounded-lg p-2 text-start outline-0 ${darkMode ? "bg-[#000] border-[#5d5d5d] text-[#fff]" : "text-[#000] bg-[#fff] border-[#ddd]"}`} id="email" placeholder="البريد الإلكتروني" />
                </div>
              </div>

              <div className="w-full flex justify-start items-center gap-3">
                <input type="checkbox" className={` `} />
                <span className={`${darkMode ? `text-[#9ca3af]` : `text-[#666]`}`}> أوافق علي الشروط والأحكام </span>
              </div>

              <button type="submit" dir="rtl"
                className={`w-full flex justify-center items-center gap-3 cursor-pointer border rounded-lg p-2 duration-500  ${darkMode ? `text-[#9ca3af] border-[#5d5d5d] hover:bg-[#5d5d5d]` : `bg-[#fff] border-[#ddd] hover:bg-[#aaa] hover:text-white`}`}>
                <span className="">
                  <FaSignInAlt />
                </span>
                <span className="">  تسجيل الدخول </span>
              </button>

            </form>

            <div className={`w-full flex justify-center items-center relative after:content-[''] after:absolute after:top-[50%] after:right-0 after:w-[42%] after:h-[2px]
                     before:content-[''] before:absolute before:top-[50%] before:left-0  before:w-[42%] before:h-[2px] 
										 ${darkMode 
                     ? "text-[#fff] before:bg-[#5d5d5d] after:bg-[#5d5d5d]" 
                     : "text-[#666] after:bg-[#22a5ad] before:bg-[#22a5ad] "}
										 `}>
              OR
            </div>

            <div className="w-full flex flex-wrap justify-center items-center gap-4">

              <Link to={`/login`} className="w-full flex items-center justify-center gap-3">
                <button
                  type="submit"
                  dir="rtl"
                  className={`w-full flex items-center justify-center gap-3 rounded-lg cursor-pointer p-2 duration-500 hover:bg-[#aaa] hover:text-[#000] border 
                    ${darkMode ? "bg-[#000] border-[#5d5d5d] text-[#fff]" : "bg-[#fff] text-[#666] border-[#ddd]"}
                    `}
                >
                  <span dir="rtl">
                    <FaUserCircle />
                  </span>
                  <span className="Button_content__hmBjB"> بالفعل انا امتلك حساب </span>
                </button>
              </Link>

              <button
                type="submit"
                dir="rtl"
                className={`w-full flex items-center justify-center gap-3 rounded-lg cursor-pointer p-2 duration-500 border 
                  ${darkMode 
                  ? "bg-[#000] border-[#5d5d5d] text-[#fff] hover:bg-[#aaa] hover:text-[#000]"
                  : "bg-[#fff] text-[#2ca4ab border-[#ddd] hover:bg-[#aac7c9] hover:text-[#fff]"}

                    `}
              >
                <span dir="rtl">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4">
                    </path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853">
                    </path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05">
                    </path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335">
                    </path>
                  </svg>
                </span>
                <span className="Button_content__hmBjB"> ادخل عبر  جوجل</span>
              </button>

              <button type="submit" dir="rtl"
                className={`w-full flex items-center justify-center gap-3 cursor-pointer rounded-lg p-2 duration-500 
                ${darkMode 
                ? "bg-[#000] border border-[#5d5d5d] text-[#fff] hover:bg-[#aaa] hover:text-[#000]" 
                : "bg-[#4267b2e6] text-[#fff] hover:bg-[#fff] hover:text-[#2ca4ab] "}

                `}>
                <span dir="rtl">
                  <FaFacebook />
                </span>
                <span className="Button_content__hmBjB">ادخل فيسبوك </span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp
