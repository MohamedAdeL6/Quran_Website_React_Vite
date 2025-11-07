import React from 'react'
import logo from './LoadingImage/logo.png'
import Lottie from "lottie-react";

import anim4 from "../../assets/LoadingPage/Animation4.json";
import anim14 from "../../assets/LoadingPage/Animation14.json"

function Loading1() {
  return (
    <>
      <div className='w-full h-screen flex flex-wrap justify-center items-center'>

        <div className='flex flex-wrap justify-center items-center gap-2'>

          <div className='relative w-full '>

              <Lottie animationData={anim14} loop className='h-75 w-75' />


            <div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  h-30 w-30'>
              <img src={logo} alt='Logo_Quran_kareem' title='Logo_Quran_kareem' className='w-fit h-auto object-contain animate-bounce' />
            </div>
          </div>

          <div className="spinner_container">
            <div className="spinner spinner5 ">
              <Lottie animationData={anim4} loop className='h-40'/>
            </div>
          </div>

        </div>

      </div>

    </>

  )
}

export default Loading1




