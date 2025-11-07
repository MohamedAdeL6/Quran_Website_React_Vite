
import imageDark from "../../TafsirQuranImages/imageDark.png"
import imageLight from "../../TafsirQuranImages/imageLight.png"

function SingleTafsirAyah({
  darkMode,
  tafsirLoading,
  tafsirError,
  tafsirVerses,
  versesList,
  currentPage,
  pageColored,
  selectedTafsirLang,
  setCurrentPage,
}) {

  // --------------------------------------------------------------------------------
  // tafsirVerses to unique tafsir verses
  const renderedAyahs = new Set(); // persist across re-renders 

  return (
    <>
      {/* Display Tafsir Verses as Single Section */}
      <div className={`w-full overflow-hidden rounded-md shadow ${darkMode ? "border border-[#5d5d5d]" : ""}`} dir="rtl">
        {/* Content Of TafsirAyah */}
        <div className="flex flex-wrap justify-center items-center overflow-y-auto max-h-[450px] ">
          {
            tafsirLoading ? <p>loading .......</p>
              : tafsirError ? <p>{tafsirError}</p>
                : (tafsirVerses && tafsirVerses.length > 0) ? (() => {
                  const startIndex = currentPage * 2;
                  const currentVerses = tafsirVerses.slice(startIndex, startIndex + 2); // Show 2 verses

                  return currentVerses.map((ayah, index) => {
                    const ayahNumbers = [...new Set(Object.keys(ayah.verses).map(el => parseInt(el.split(":")[1])))];

                    const isAlreadyRendered = ayahNumbers.some(num => renderedAyahs.has(num));
                    if (isAlreadyRendered) return null;

                    ayahNumbers.forEach(num => renderedAyahs.add(num));

                    return (
                      <div key={index} className="w-full flex flex-wrap justify-center items-center">

                        <div className={`w-full flex flex-wrap justify-center items-center 
                                    ${pageColored ? "bg-[#d9edf7] " : ""}
                                    ${darkMode ? "dark:bg-black dark:text-white dark:rounded-sm dark:border-b dark:border-white" : ""}`}>
                          <div className="w-full container">
                            <div className="w-full flex flex-wrap justify-start items-center text-justify px-2 py-1 rounded-md ">
                              {
                                versesList ? (() => {
                                  const verse = ayahNumbers
                                    .map(num => versesList.find(el => el.numberInSurah === num))
                                    .filter(Boolean);

                                  if (verse.length === 0) {
                                    return (
                                      <span className="w-full flex justify-start items-center">
                                        الآيــــة رقم
                                      </span>
                                    );
                                  }

                                  return (
                                    <div className="flex flex-col gap-2 text-right">
                                      {verse.map((ayah, i) => (
                                        <div key={i} className={`font-bold text-xl p-2 rounded
                                            ${darkMode ? "text-white border-[#5d5d5d]" : ""}
                                                ${pageColored ? "text-[#000] rounded-sm border-0 " : "text-[#22a5ad] border-b-2 border-[#22a5ad]"}
                                            `}>

                                          {ayah.text}

                                          <p className="relative inline-block mr-1 w-7 h-7 sm:w-9 sm:h-9 align-middle">
                                            <img
                                              src={darkMode ? imageDark : imageLight}
                                              alt={`Ayah ${ayah.numberInSurah}`}
                                              title={`Ayah ${ayah.numberInSurah}`}
                                              className="w-full h-full"
                                            />
                                            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center text-[11px] font-bold">
                                              {ayah.numberInSurah}
                                            </span>
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })() : (
                                  <span className="w-full flex justify-start items-center">
                                    الآيــــة رقم
                                  </span>
                                )
                              }
                            </div>
                          </div>

                        </div>

                        <div className={`w-full flex justify-center items-center
                                ${darkMode ? "dark:bg-[#000] dark:text-white" : ""}
                                    ${pageColored ? "bg-[#dff0d8]" : ""}`}
                        >

                          <div className="w-full container">
                            <div className="`w-full flex justify-start items-center text-xl font-bold pt-2 px-2">
                              <span className="border-b-2 pb-2"> التفسير :   </span>
                            </div>
                          </div>
                        </div>

                        <div className={`w-full flex justify-center items-center 
                        ${pageColored ? "bg-[#dff0d8]" : ""}
                        ${darkMode ? "dark:text-white dark:bg-black" : ""}`}
                          dir={`${selectedTafsirLang === "english" ? "ltr" : "rtl"}`}
                        >
                          <div className="w-full container">

                            <div className={`text-justify text-[17px] p-2`}
                              dangerouslySetInnerHTML={{ __html: ayah.text }}
                            />

                          </div>

                        </div>


                      </div>
                    );
                  });
                })()
                  : <p className={`text-xl sm:text-2xl font-bold  ${darkMode ? "text-white" : "text-[#22a5ad]"}`}>
                    التفسيـــر
                  </p>
          }
        </div>
        {/* Pagination Controls */}
        <div className={`flex justify-center items-center mt-4 gap-4 py-2`}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className={`bg-gray-200 px-4 py-1 rounded disabled:opacity-50 cursor-pointer duration-300 
        ${darkMode ? "bg-[#000] border border-[#5d5d5d] hover:bg-[#5d5d5d] text-white" : "hover:bg-[#22a5ad] hover:text-[#fff]"}`}
          >
            السابق
          </button>
          <span className={`text-sm  ${darkMode ? "text-white" : "text-gray-700"}`}>
            صفحة {currentPage + 1} من {Math.ceil((tafsirVerses?.length || 1) / 2)}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil((tafsirVerses?.length || 1) / 2) - 1))}
            disabled={currentPage >= Math.ceil((tafsirVerses?.length || 1) / 2) - 1}
            className={` px-4 py-1 rounded disabled:opacity-50 cursor-pointer duration-300 
        ${darkMode ? "bg-[#000] border border-[#5d5d5d] hover:bg-[#5d5d5d] text-white" : "bg-gray-200 hover:bg-[#22a5ad] hover:text-[#fff]"}`}
          >
            التالي
          </button>
        </div>
      </div>
    </>
  )
}

export default SingleTafsirAyah




