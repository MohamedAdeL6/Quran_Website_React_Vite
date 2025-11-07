
import { FaSignInAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import imageLogo from "../assets/images/Logo/DesignLogo.jpeg"

function Login() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className={`w-full flex justify-center items-center ${darkMode ? `bg-[#000]` : `bg-[#fff]`}`}>

      <div className='container'>

        <div className="w-full h-[calc(100vh-71px)] flex flex-wrap sm:flex-nowrap justify-center items-center py-3 sm:py-7" dir='rtl'>

          <div className={`w-full sm:h-[-webkit-fill-available] sm:w-auto flex justify-center items-center rounded-lg border ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}>
            <div className={`w-full flex flex-wrap justify-center items-center gap-2 sm:gap-9 py-5  pb-4`}>
              <span className={`w-full flex flex-wrap justify-center items-center text-2xl font-bold ${darkMode ? `text-white` : ``}`}>
                تسجيل الدخول إلى موقع
              </span>
              <div className={`w-full flex flex-wrap justify-center items-center text-2xl font-bold gap-2 ${darkMode ? `text-white` : ` `}`}>
                <span> Quran.com  </span>
                <img src={imageLogo} height={50} width={50} className='rounded-xl' />
              </div>
            </div>
          </div>

          <div className={`sm:h-[-webkit-fill-available] sm:w-[500px] flex flex-wrap justify-center items-center gap-7 p-3 py-[20px] rounded-lg border ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`}>

            <form className="inputSignin w-full flex flex-wrap gap-7 sm:gap-13">

              <div className="input w-full flex">
                <div className="w-full flex items-center justify-center gap-3">
                  <input
                    type="email"
                    name="email"
                    className={`w-full border rounded-lg p-2 text-start outline-0 
                       ${darkMode
                        ? "text-[#fff] bg-[#000] border-[#5d5d5d] "
                        : "text-[#000] bg-[#fff] border-[#ddd]"}`}
                    id="email"
                    placeholder="البريد الإلكتروني" />
                </div>
              </div>

              <div className="input w-full flex">
                <div className="w-full flex items-center justify-center gap-3 ">
                  <input
                    type="password"
                    name="password"
                    className={`w-full border rounded-lg p-2 text-start outline-0 
                      ${darkMode
                        ? "bg-[#000] border-[#5d5d5d] text-[#fff]"
                        : "text-[#000] bg-[#fff] border-[#ddd] "}`}
                    id="password"
                    placeholder="كلمة السر " />
                </div>
              </div>

              <button type="submit"
                className={`w-full flex items-center justify-center gap-3 rounded-lg p-2 cursor-pointer
						   border duration-500 hover:bg-[#2ca4ab] hover:text-[#fff] hover:border-[#2ca4ab] 
              ${darkMode
                    ? "bg-[#000] border-[#5d5d5d] text-[#fff]"
                    : "text-[#2ca4ab] bg-[#fff] border-[#2ca4ab] "}						 
						 `}>
                <span dir="rtl" className='text-[20px] '>
                  <FaSignInAlt />
                </span>
                <span className="Button_content__hmBjB"> تسجيل الدخول  </span>
              </button>

              <Link
                to=""
                className={`w-full flex items-center justify-center gap-3 rounded-lg p-2 border duration-500 hover:bg-[#2ca4ab] hover:text-[#fff] hover:border-[#2ca4ab] ${darkMode ? "bg-[#000] border-[#5d5d5d] text-[#fff]" : "text-[#2ca4ab] bg-[#fff] border-[#2ca4ab] "} `}
              >
                <span dir="rtl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                    </path>
                    <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    </path>
                  </svg>
                </span>
                <span className="Button_content__hmBjB">ادخل عبر البريد الإلكتروني</span>
              </Link>

            </form>

            <Link to={`/signUp`} dir="rtl"
              className={`w-full flex justify-center items-center gap-3 border rounded-lg p-2 duration-300
					                ${darkMode
                  ? "border-[#5d5d5d] text-[#aaa] hover:text-[#22a5ad] hover:bg-[#fff]"
                  : "text-[#666] hover:text-[#000] hover:bg-[#aaa] border-[#aaa]"}`}
            >
              <span className="">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m9 19 1.41-1.41L5.83 13H22v-2H5.83l4.59-4.59L9 5l-7 7 7 7Z" fill="currentColor">
                  </path>
                </svg>
              </span>

              <span>  إنشاء حساب جديد </span>

            </Link>


            <span className={`w-full text-base  ${darkMode ? "text-[#aaa]" : "text-[#666]"}`}>
              حماية خصوصيتك هي أولويتنا - من خلال التسجيل، فإنك توافق على
              <a href="/privacy" target="_blank" rel="noreferrer" className="underline decoration-2 duration-500 hover:text-[#2ca4ab]">
                &nbsp;سياسة الخصوصية
              </a>
              و
              <a href="/terms-and-conditions" target="_blank" rel="noreferrer" className="underline decoration-2 duration-500 hover:text-[#2ca4ab]">
                الشروط والأحكام &nbsp;
              </a>
              الخاصة بنا.

            </span>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
