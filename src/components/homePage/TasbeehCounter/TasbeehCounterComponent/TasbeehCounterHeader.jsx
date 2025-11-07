import React from 'react'

function TasbeehCounterHeader({
  darkMode,
  onClickAddTextZakr,
  onClickResetAllCounters,
  onClickToggleDeleteMode,
  isDeleteMode,
}) {
  return (
    <>
      {/* Header  &&  Buttons Setting */}
      <div className="w-full flex flex-wrap justify-center items-center mb-3">

        <div className={`w-full flex justify-center items-center py-3`}>
          <h1
            className={`text-4xl font-bold mb-5 py-4 px-5 rounded-lg border-1 
                    ${darkMode ? `text-white border-[#5d5d5d]` : `border-[#ccc] text-black `}`}>
            المسبحة اونلاين
          </h1>
        </div>

        <div className="w-full flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
          {/* Toggle Add New Zakr */}
          <button
            className={`w-full flex justify-center items-center px-4 py-2 rounded-md text-xl cursor-pointer text-white
                  ${darkMode ? "bg-black border border-[#5d5d5d]" : "bg-[#3b82f6]"}`}
            onClick={onClickAddTextZakr}
          >
            إضـافــــة ذكـــــر
          </button>

          {/* Toggle Reset All Count */}
          <button
            className={`w-full text-light_main_txt_color px-4 py-2 rounded text-xl  text-white cursor-pointer
                  ${darkMode ? `bg-black border border-[#5d5d5d]` : `bg-[#22a5ad]`}`}
            onClick={onClickResetAllCounters}
          >
            تصفير جميع العدادات
          </button>

          {/* Toggle Delete Mode Button */}
          <button
            className={`w-full text-white px-4 py-2 rounded text-xl cursor-pointer 
                  ${darkMode ? `bg-black border border-[#5d5d5d]` : `bg-red-600 `}`}
            onClick={onClickToggleDeleteMode}
          >
            {isDeleteMode ? "إلغاء حذف" : "حذف ذكر"}
          </button>
        </div>

      </div>
    </>
  )
}

export default TasbeehCounterHeader