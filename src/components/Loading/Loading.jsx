// ---------- import Lottie library ;
import Lottie from "lottie-react";


import anim4 from "../../assets/LoadingPage/Animation4.json";
import anim7 from "../../assets/LoadingPage/Animation7.json";
import anim14 from "../../assets/LoadingPage/Animation14.json";








function Loading() {
  return (
    <>
      <div className={`loading_Section w-fit`}>
        <div className="spinner_container">
          <div className="spinner_container_top">
            <div className="spinner spinner14">
              <Lottie animationData={anim14} loop />
            </div>
            <div className="spinner spinner7">
              <Lottie animationData={anim7} loop />
            </div>
          </div>
          <div className="spinner spinner5">
            <Lottie animationData={anim4} loop />
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading