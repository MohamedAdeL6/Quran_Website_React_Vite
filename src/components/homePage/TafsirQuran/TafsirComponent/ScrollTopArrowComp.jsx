import React from 'react'

function ScrollTopArrowComp({
  isVisible,
  scrollToTop,
  darkMode,
  // eslint-disable-next-line no-unused-vars
  Icon
}) {
  return (
    <>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`${`bottom-[25px]`} fixed right-[95px] p-3 rounded-full shadow-lg cursor-pointer duration-300
                  ${darkMode ? "bg-white text-black hover:bg-[#5d5d5d] hover:text-white" : "bg-[#22a5ad] text-white hover:bg-white hover:text-[#22a5ad]"}`}
        >
          <Icon size={20} />
        </button>
      )}
    </>
  )
}

export default ScrollTopArrowComp