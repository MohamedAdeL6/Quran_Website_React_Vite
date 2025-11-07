import React from 'react'
import { Link } from 'react-router-dom'

function TextImageSection({
  image,
  darkMode,
}) {
  return (
    <>
      {/* Text && Image Section  */}
      <div className='w-full flex flex-row-reverse justify-center items-center gap-4' >

        {/* Image For Radio Section */}
        <div className='w-2/3 lg:w-1/2 h-full hidden sm:flex justify-center items-center rounded-tl-lg rounded-tr-lg '>
          <img src={image} alt="radio" className="object-fit w-full h-full  rounded-tl-lg rounded-tr-lg" />
        </div>

        {/* Text Section */}
        <div className={`w-full h-full flex flex-col justify-between rounded-tl-lg rounded-tr-lg border  ${darkMode ? "border-[#5d5d5d]" : "border-[#ddd]"}`} dir="rtl">

          <div className={`w-full px-2 flex flex-wrap justify-center items-center gap-4 sm:gap-7 lg:gap-9 py-2 lg:py-2`}>

            <div className={`w-full flex justify-center items-center `}>
              <p className={` text-xl ${darkMode ? "text-white" : "text-[#3578e5]"}`} dir='rtl'> بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ </p>
            </div>

            <div className={`w-full flex justify-center items-center `}>
              <p className={` text-xl ${darkMode ? "text-white" : "text-[#3578e5]"}`}>﴿ إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا ﴾ </p>
            </div>

            <div className={`w-full flex justify-center items-center `}>
              <Link to="http://archive.liveradiu.com:8080/@liveradiu.com/"
                className={`inline-block text-sm sm:text-md  text-[#fff] p-2 rounded-full 
                        ${darkMode ? "bg-[#000]" : "bg-[#3578e5] "}`}>
                « أرشيف تسجيلات اذاعة القرآن »
              </Link>
            </div>

          </div>

          <div className='w-full flex flex-wrap justify-center items-center gap-3'>

            <p className="w-full px-2">إذاعة القرآن الكريم بث مباشر :</p>

            <p className={`w-full px-2 text-xl sm:text-3xl font-bold  ${darkMode ? "text-[#fff]" : "text-[#22a5ad]"}`}>
              إذاعة القرآن الكريم من القاهرة مباشر
            </p>

            <p className="w-full px-2 text-sm break-words">
              <span>حيث بإمكانك أن تستمع للقرآن الكريم ليلا نهارا. </span>
              <span>MP3</span>
              <span> راديو القرآن الكريم استماع أون لاين من القاهرة  </span>
            </p>

            <p className="w-full bg-[#1d2134] text-white text-center rounded-tl-lg rounded-tr-lg px-3 py-2">
              إذاعة القرآن الكريم من القاهرة مصر 93.1
            </p>

          </div>

        </div>

      </div>

    </>
  )
}

export default TextImageSection