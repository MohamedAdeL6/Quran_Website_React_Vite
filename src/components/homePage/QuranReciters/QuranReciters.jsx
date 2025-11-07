import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import { handleStyleReciters } from '../../../appStore/slices/QuranRecitersSlice';

function QuranReciters() {

  // -------------------------- dark mode  -----------------------
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const reciters = useSelector((state) => state.quranReciters.data);

  const dispatch = useDispatch()


  const handleStyle = (style) => {
    dispatch(handleStyleReciters(style))
  }

  // State to track image loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show SweetAlert loading
    Swal.fire({
      title: '...... جاري التحميل ',
      text: 'الرجاء الانتظار حتي يتم تحميل القراء ...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        setLoading(false);
      }
    });

    // Load all images
    const images = reciters.map((reciter) => new Image().src = reciter.image1);

    // Wait for images to load
    const imagePromises = images.map((img) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = img;
        image.onload = resolve;
        image.onerror = reject;
      });
    });

    // Wait for all images to load, then close the Swal loading
    Promise.all(imagePromises)
      .then(() => {
        Swal.close(); // Close loading alert
        setLoading(false); // Set loading state to false
      })
      .catch(() => {
        Swal.close();
        setLoading(false);
      });
  }, [reciters]);

  // If images are loading, show nothing or a loading spinner
  if (loading) {
    return null; // Or show a loading spinner here
  }

  return (
    <div className={`w-full flex justify-center items-center min-h-[calc(100vh-71px)] ${darkMode ? `bg-[#000]` : `bg-white`}`}>

      <div className={`container w-full flex justify-center items-center py-[7px] ${darkMode ? `py-[8px]` : ``}`}>

        <div className={`w-full flex flex-wrap justify-center items-center gap-2 `}>

          <div className={`w-full flex justify-center items-center py-3 rounded-lg text-white border 
            ${darkMode ? "bg-[#000] border-[#5d5d5d]" : "border-[#ddd] bg-[#22a5ad] "}`}>
            <h1 className={`text-2xl sm:text-3xl font-bold p-4 `}> قـــــــــــراء القـــــــرآن </h1>
          </div>

          <div className={`w-full flex flex-col gap-3 sm:gap-2 lg:gap-4 sm:flex-row justify-between items-center p-3 rounded-lg text-white border 
            ${darkMode ? "bg-[#000] border-[#5d5d5d]" : "border-[#ddd] bg-[#22a5ad] "}`} dir='rtl'>

            <button className={`w-full p-2 border  rounded-md ${darkMode ? "border-[#5d5d5d]" : "border-white"}`}
              onClick={() => handleStyle("Murattal")}
            >
              <h1 className={`text-xl sm:text-xl lg:text-3xl font-bold px-4 py-1 cursor-pointer`}>  ترتيل </h1>
            </button >

            <button className={`w-full p-2 border  rounded-md ${darkMode ? "border-[#5d5d5d]" : "border-white"}`}
              onClick={() => handleStyle("Mujawwad")}
            >
              <h1 className={`text-xl sm:text-xl lg:text-3xl font-bold px-4 py-1 cursor-pointer`}>  تجويد </h1>
            </button>
            <button className={`w-full p-2 border  rounded-md ${darkMode ? "border-[#5d5d5d]" : "border-white"}`}
              onClick={() => handleStyle("Kids_repeat")}
            >
              <h1 className={`text-xl sm:text-xl lg:text-3xl font-bold px-4 py-1 cursor-pointer`}>  المصحف المعلم </h1>
            </button>


          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5" dir='rtl'>
            {reciters.map((reciter) => (

              <Link
                key={reciter.id}
                to={`/soundSurah/${reciter.name}-${reciter.style}`}
                className={`block bg-slate-200 rounded-lg shadow-lg overflow-hidden hover:shadow-lg transition duration-300 ${darkMode ? "border border-[#5d5d5d]" : ""}`}
              >
                <div className="relative w-full h-56">
                  <img
                    src={reciter.image}
                    alt={reciter.name}
                    className="w-full h-full object-cover "
                  />
                </div>
                <div className={`p-4 text-center ${darkMode ? "bg-black border border-[#5d5d5d]" : ""}`}>
                  <h3 className={`text-lg font-semibold  ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {reciter.name}
                  </h3>
                  <p className={`text-lg ${darkMode ? "text-white" : "text-gray-600 "}`}>
                    {
                      reciter.style === "Murattal" ? `مرتــــل` : reciter.style === "Kids_repeat" ? `المصحف المعلم` : `مجــــود`
                    }</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
export default QuranReciters



