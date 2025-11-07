import React from 'react'

function AddTextAzkar({
  addTextZakr,                // addTextZakr = {addTextZakr}
  zakrRef,                   // zakrRef = {zakrRef}
  textareaRef,                // textareaRef = {textareaRef}
  textZakr,                //   textZakr = {textZakr}
  isDeleteMode,                 // isDeleteMode = {isDeleteMode} 
  selectedForDeletion,           // selectedForDeletion = {selectedForDeletion}
  deleteZakr,
  deleteZkrMsg,
  addNewZakr,
  setAddTextZakr,
  setTextZakr,
}) {
  return (
    <>

      {/* If delete mode is active, show delete button */}
      {isDeleteMode && selectedForDeletion.length > 0 && (
        <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 p-4 rounded-md text-white z-30 ">
          <button onClick={() => { deleteZakr(); deleteZkrMsg(); }} className="w-50 h-14 bg-red-600 text-white rounded-xl cursor-pointer">
            تأكيد الحــذف
          </button>
        </div>
      )}


      {/* Add Azkar Modal */}
      {addTextZakr && (
        <div className="fixed left-0 top-0 flex justify-center items-center h-screen w-screen cursor-pointer pr-7 pl-3 sm:pr-0 sm:pl-0">
          <div className="absolute left-0 top-0 h-screen w-screen bg-[#585f6b] opacity-80"></div>

          <div
            ref={zakrRef}
            className="z-10 flex flex-col justify-center items-center w-full h-1/2 max-w-2xl p-5 bg-white rounded-lg"
          >
            <textarea
              ref={textareaRef}
              className="addZakr w-full h-40 p-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أضف أذكارك هنا..."
              value={textZakr}
              onChange={(e) => setTextZakr(e.target.value)}
            ></textarea>

            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg text-lg shadow-md"
              onClick={() => { addNewZakr(); setAddTextZakr(false) }}
            >
              إضافة الذكر
            </button>
          </div>
        </div>
      )}


    </>
  )
}

export default AddTextAzkar