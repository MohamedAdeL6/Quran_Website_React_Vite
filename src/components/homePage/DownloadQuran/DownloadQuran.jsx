import React from "react";
import { useSelector } from "react-redux";

const DownloadQuran = () => {

  const quranPdf = useSelector((data) => data.QuranPdfDownloading.value);

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (

    <div id="download" className={`w-full flex justify-center items-center py-5 ${darkMode ? `bg-black border-t border-[#5c5c5c] ` : ` bg-white `}`}>

      <div className="container flex justify-center items-center">

        <div className={`w-full flex flex-wrap justify-center items-center gap-9 ${darkMode ? ` border-[#5c5c5c] mt-4 ` : ``}`}>

          {/* header */}
          <div className={`w-full flex justify-center items-center`}>
            <div className={`W-full flex justify-center items-center `}>
              <h2 className={`text-xl sm:text-3xl font-bold  border-b-2 pb-4  ${darkMode ? `border-[#5c5c5c] text-white` : `text-[#22a5ad] border-[#22a5ad]`}`}>
                {" "}
                تحميل القرآن الكريم PDF{" "}
              </h2>
            </div>
          </div>

          {/* Download */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {quranPdf.map((book, index) => (

              <div key={index} className={`w-full flex flex-col gap-2 shadow-lg rounded-lg overflow-hidden text-center border p-2 ${darkMode ? `bg-black border-[#5d5d5d]` : `border-[#ddd]`}`}>

                <div className={`imageBox w-full border  rounded-lg p-2 ${darkMode?"border-[#5d5d5d]":"border-[#ddd]"}`}>
                  <img src={book.cover} alt={book.title} className="w-full h-60 object-cover rounded" />
                </div>

                <div className={`content w-full flex flex-col justify-center items-center rounded-lg ${darkMode ? "bg-black border border-[#5d5d5d]" : "bg-gray-200"}`}>

                  <h2 className={`text-lg font-bold mt-2 mb-2  ${darkMode ? `text-white` : `text-gray-600`}`}>{book.title}</h2>

                  <p className={`text-base mb-2 ${darkMode ? `text-white` : `text-gray-600`}`}>اللغة: {book.language}</p>

                  <p className={`text-base mb-2 ${darkMode ? `text-white` : `text-gray-600`}`}>الحجم: {book.size}</p>

                  <div className="mt-4 flex justify-center space-x-4 mb-2" dir="rtl">

                    <span className={`text-2xl  ${darkMode ? `text-white` : `text-gray-600`}`}> تحميل : &nbsp;  </span>

                    <a href={book.pdf} target="_blank" rel="noopener noreferrer">
                      <img src="https://www.pdfquran.com/images/PDF.webp" alt="PDF" className="w-10 h-10" />
                    </a>

                    <a href={book.zip} target="_blank" rel="noopener noreferrer">
                      <img src="https://www.pdfquran.com/images/ZIP.webp" alt="ZIP" className="w-10 h-10" />
                    </a>

                  </div>
                </div>


              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
};

export default DownloadQuran;















