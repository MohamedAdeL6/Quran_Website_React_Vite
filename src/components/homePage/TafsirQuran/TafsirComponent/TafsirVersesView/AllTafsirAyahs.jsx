
import imageDark from "../../TafsirQuranImages/imageDark.png"
import imageLight from "../../TafsirQuranImages/imageLight.png"

const AllTafsirAyahs = ({
  darkMode,
  tafsirLoading,
  tafsirError,
  tafsirVerses,
  versesList,
  pageColored,
  selectedTafsirLang,
}) => {

  // tafsirVerses to unique tafsir verses
  const renderedAyahs = new Set(); // persist across re-renders 

  return (

    <>
      {/* Display Tafsir Verses AS All Section */}
      <div className={`w-full overflow-hidden rounded-md shadow border-t text-black ${darkMode ? "border-[#5d5d5d]" : "border-[#ccc]"} `}
        dir="rtl">
        <div className={`flex flex-wrap justify-center items-center overflow-y-auto`}>
          {
            tafsirLoading ? (
              <p>loading .......</p> // Show loading message when loading state is true
            ) : tafsirError ? (
              <p>{tafsirError}</p> // Show error message if there's an error
            ) : (tafsirVerses && tafsirVerses.length > 0) ? (() => {
              return tafsirVerses.map((ayah, index) => {
                const ayahNumbers = [...new Set(Object.keys(ayah.verses).map(el => parseInt(el.split(":")[1])))];

                // Optionally skip already rendered ayahs (if needed)
                const isAlreadyRendered = ayahNumbers.some(num => renderedAyahs.has(num));
                if (isAlreadyRendered) return null;

                ayahNumbers.forEach(num => renderedAyahs.add(num));

                return (
                  <div key={index} className="w-full flex flex-wrap justify-center items-center">

                    <div className={`w-full flex flex-wrap justify-center items-center 
                                ${pageColored ? "bg-[#d9edf7] " : ""} 
                                ${darkMode ? "bg-black" : ""}
                          `}
                    >

                      <div className="w-full container">

                        <div className="w-full flex flex-wrap justify-start items-center text-justify py-2 rounded-md ">
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
                                <div className={`w-full flex flex-col gap-2 text-right`}>
                                  {verse.map((ayah, i) => (
                                    <div key={i} className={`font-bold text-md text-justify py-2 w-fit border-b-2
                                              ${darkMode ? "text-white border-[#5d5d5d]" : ""}
                                              ${pageColored ? "text-[#000] rounded-sm border-0 " : "text-[#22a5ad]  "}
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

                    <div className={`w-full flex justify-center items-center pb-3
                              ${darkMode ? "dark:bg-[#000] dark:text-white" : ""}
                              ${pageColored ? "bg-[#dff0d8]" : ""}`}
                    >
                      <div className="w-full container">
                        <div className={`w-full flex justify-start items-center text-xl font-bold pt-2 `}>
                          <span className="border-b-2 pb-2"> التفسير :   </span>
                        </div>
                      </div>
                    </div>

                    <div className={`w-full flex justify-center items-center
                      ${pageColored ? "bg-[#dff0d8] rounded-sm border-0 " : "text-[#000] "}
                      ${darkMode ? "bg-black text-white " : ""}`}
                      dir={`${selectedTafsirLang === "english" ? "ltr" : "rtl"}`}
                    >
                      <div className="w-full container">
                        <div className={`w-ful text-justify text-[17px]  pb-4 border-[#22a5ad] ${darkMode ? "border-b-2  border-[#22a5ad]" : ""}`}
                          dangerouslySetInnerHTML={{ __html: ayah.text }}
                        />

                      </div>
                    </div>

                  </div>
                );
              });
            })() : <p className={`text-xl sm:text-2xl  py-4 ${darkMode ? "text-white " : "text-[#000]"}`}>
              التفسيـــر
            </p>
          }
        </div>
      </div>

    </>

  );
};

export default AllTafsirAyahs;