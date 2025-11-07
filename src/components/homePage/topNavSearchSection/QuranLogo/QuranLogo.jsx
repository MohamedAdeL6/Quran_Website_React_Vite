import React from 'react'
import QuranLogoSvg from "./LogoImageSVG/LogoImage"
function QuranLogo() {
  return (
    <div className='homePage_image w-full flex justify-center items-center'>
      <div className={`w-[450px] sm:w-[400px] lg:w-[420px] 2xl:w-[390px]`} >
        <QuranLogoSvg />
      </div>
    </div>
  )
}

export default QuranLogo
