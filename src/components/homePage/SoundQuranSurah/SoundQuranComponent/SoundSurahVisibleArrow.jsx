
function SoundSurahVisibleArrow({
  isVisible,
  scrollToTop,
  // eslint-disable-next-line no-unused-vars
  IconArrowUp,
}) {
  return (
    <>
     {/* Visible Arrow Scroll To Up Page */}
          {isVisible && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-10 right-[15px] sm:right-[35px] md:right-[50px] lg:right-[70px] 2xl:right-[90px] p-3 bg-[#838383] text-white rounded-full shadow-lg hover:bg-[#5d5d5d] cursor-pointer"
            >
              <IconArrowUp size={20} />
            </button>
          )}

    </>
  )
}

export default SoundSurahVisibleArrow