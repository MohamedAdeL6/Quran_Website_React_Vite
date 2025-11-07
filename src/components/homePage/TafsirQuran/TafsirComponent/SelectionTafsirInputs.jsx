import React from 'react'

function SelectionTafsirInputs({
  darkMode,                       //darkMode ={darkMode}
  selectSurahName,                // selectSurahName = {selectSurahName}
  surahsList,                     // surahsList = {surahsList}
  fromAyah,                      // fromAyah = {fromAyah}
  toAyah,                        //  toAyah = {toAyah}
  selectedTafsirLang,            //  selectedTafsirLang = {selectedTafsirLang}
  tafsirInfo,                    // tafsirInfo = {tafsirInfo}
  loading,                       // loading = {loading}
  error,                         //  error = {error}
  selectedTafsirName,            // selectedTafsirName = {selectedTafsirName}
  onChangeFromAyah,              //onChangeFromAyah ={(e) => setFromAyah(e.target.value)}
  onChangeToAyah,               // onChangeToAyah = {(e) => setToAyah(e.target.value)}
  onClickSubmit,                //onClickSubmit = {() => { showData() }}
  onChangeLang,                 // onChangeLang={(e) => {setSelectedTafsirLang(e.target.value)}}
  setSelectedTafsirName,        // setSelectedTafsirName={setSelectedTafsirName}             
  setSelectTafsirSlug,          //setSelectTafsirSlug= {setSelectTafsirSlug}
  setSelectSurahName,           //  setSelectSurahName = {setSelectSurahName}
  setSelectSurahNumber,         //  setSelectSurahNumber = {setSelectSurahNumber}
  pageColored,

}) {
  return (
    <>
      {/* Selection Section */}
      <div className={`w-full flex justify-center items-center         
        ${pageColored ? "bg-[#d9edf7]" : ""}
          ${darkMode ? "dark:bg-[#000] " : ""}`} dir="rtl"
      >
        <div className='container'>
          <div className={`w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 py-3`} >

            {/* Tafsir Language Selection */}
            <div className="w-full flex flex-wrap justify-start items-center">
              <label className={`block text-md sm:text-lg font-semibold text-gray-700 mb-2 pr-2 ${darkMode ? `text-white` : `text-gray-700`}`}>
                اختر اللغة  :
              </label>

              <select className={`w-full p-3 border rounded-lg outline-none
              ${darkMode ? "text-[#fff] bg-[#000] border-[#5d5d5d]" : " bg-white border-gray-300 text-zinc-600"}`}
                value={selectedTafsirLang}
                onChange={onChangeLang}
              >
                <option defaultValue="" hidden >  اختر اللغة  </option>
                {

                  selectedTafsirLang && selectedTafsirLang ?
                    ([...new Set(tafsirInfo.allTafsirName?.map(el => el.language_name.toLowerCase()))]
                      .map((tafsirLang, index) => {
                        return (
                          <option key={index} value={tafsirLang}>
                            {tafsirLang}
                          </option>
                        )
                      })
                    )
                    :
                    Array.isArray(tafsirInfo) && tafsirInfo.length > 0 ?
                      ([...new Set(tafsirInfo.map(el => el.language_name.toLowerCase()))]
                        .map((tafsirLang, index) => {
                          return (
                            <option key={index} value={tafsirLang}>
                              {tafsirLang}
                            </option>
                          )
                        })
                      )

                      :
                      (<option disabled>لا توجد بيانات متاحة</option>)
                }
              </select>
            </div>

            {/* Tafsir Name Selection */}
            <div className="w-full flex flex-wrap justify-start items-center ">
              <label className={`block text-md sm:text-lg font-semibold mb-2 pr-2 ${darkMode ? `text-white` : `text-gray-700`}`}>
                اخترالتفسير :
              </label>

              {loading && <h1> loading ....... </h1>}
              {!loading && error && <h1> {error} </h1>}
              <select className={`w-full p-3 border  rounded-lg outline-none 
                            ${darkMode ? "text-[#fff] bg-[#000] border-[#5d5d5d]" : "text-zinc-600 border-gray-300 bg-white "}`}
                value={selectedTafsirName}
                onChange={(e) => {
                  const name = e.target.value;
                  const tafsir =
                    selectedTafsirLang
                      ?
                      tafsirInfo.specificTafsirLang?.find((tfName) => tfName.translated_name.name === name)
                      :
                      tafsirInfo?.find((tfName) => tfName.translated_name.name === name)
                  setSelectedTafsirName(name);
                  setSelectTafsirSlug(tafsir.slug);
                }}
              >
                <option defaultValue="" hidden >  اختر التفسيـــر </option>
                {
                  selectedTafsirLang ?
                    tafsirInfo.specificTafsirLang?.map((tafsirName, index) => {
                      return (
                        <option value={tafsirName.translated_name.name} key={index}>
                          {tafsirName.translated_name.name}
                        </option>
                      )
                    })
                    :
                    !loading && !error && Array.isArray(tafsirInfo) && tafsirInfo.length > 0 ? (
                      tafsirInfo.map((tafsirName, index) => {
                        return (
                          <option value={tafsirName.translated_name.name} key={index}>
                            {tafsirName.translated_name.name}
                          </option>
                        )
                      })
                    ) : (<option disabled>لا توجد بيانات متاحة</option>)
                }
              </select>
            </div>

            {/* Surah Selection */}
            <div className="w-full flex flex-wrap justify-start items-center ">
              <label className={`block text-md sm:text-lg font-semibold mb-2 pr-2 
              ${darkMode ? "text-white" : "text-gray-700"}`}>
                اختر السورة:
              </label>

              <select className={`w-full  p-3 border rounded-lg  outline-none
                            ${darkMode ? "text-[#fff] bg-[#000] border-[#5d5d5d]" : " text-zinc-600 border-gray-300 bg-white "}`}
                value={selectSurahName}
                onChange={(e) => {
                  const name = e.target.value;
                  const index = surahsList.findIndex((surah) => surah.name === name) + 1;  // +1 to make it 1-based
                  setSelectSurahName(name);
                  setSelectSurahNumber(index);                      // This is now the surah number (index + 1)
                }}
              >
                <option defaultValue="" hidden>اختر السورة</option>
                {surahsList.map((surah, index) => (
                  <option key={index} value={surah.name}>
                    {surah.name}
                  </option>
                ))}
              </select>
            </div>

            {/* From Aya Selection */}
            <div className="w-full flex flex-wrap justify-start items-center ">
              <label className={`block text-md sm:text-lg font-semibold  mb-2 pr-1 ${darkMode ? `text-white` : `text-gray-700`}`}>
                من الآية:
              </label>
              <input
                type="number"
                className={`w-full p-3 border  rounded-lg outline-none 
                              ${darkMode
                    ? "text-[#fff] bg-[#000] border-[#5d5d5d] placeholder:text-white"
                    : " bg-white border-gray-300 placeholder:text-gray-700"}`}
                placeholder="رقم الآية"
                value={fromAyah}
                onChange={onChangeFromAyah}
              />
            </div>

            {/* To Aya Selection */}
            <div className="w-full flex flex-wrap justify-start items-center ">
              <label className={`block text-md sm:text-lg font-semibold text-gray-700 mb-2 pr-1 ${darkMode ? `text-white` : `text-gray-700`}`}>
                إلى الآية:
              </label>
              <input
                type="number"
                className={`w-full p-3 border rounded-lg outline-none 
              ${darkMode ? "text-[#fff] bg-[#000] border-[#5d5d5d] placeholder:text-white" : " bg-white border-gray-300 placeholder:text-gray-700"}`}

                placeholder="رقم الآية"
                value={toAyah}
                onChange={onChangeToAyah}
              />
            </div>

            {/* Implementation Selection */}
            <div className="w-full flex flex-wrap justify-start items-center">
              <label className={`block text-md sm:text-lg font-semibold text-gray-700 mb-2 pr-1 ${darkMode ? `text-white` : `text-gray-700`}`}>
                التنفيذ :
              </label>
              <button className={`w-full p-3  border  rounded-lg cursor-pointer 
                    ${darkMode ? "text-[#fff] bg-[#000] border-[#5d5d5d] " : "border-gray-300 text-[#000] bg-white"}`}

                onClick={onClickSubmit}
              >
                نفذ
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default SelectionTafsirInputs