import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function InformationAboutUs() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (

    <div className={`w-full justify-center items-center pt-5 ${darkMode ? "bg-black" : "bg-white"}`}>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        <div className={`header h-20 flex justify-center items-center mb-5`}>
          <h1 className={`w-full sm:w-1/2 lg:w-1/3 p-4 text-center text-2xl font-bold border rounded-md ${darkMode ? "text-white border-[#5d5d5d] " : " border-[#ddd]"}`}>
            معلومات عن الموقع
          </h1>
        </div>


        <div className="w-full lg:w-8/12 mx-auto">

          {/* نبذة تعريفية */}
          <section id="quran" className="mb-5">

            <h2 className={`text-2xl md:text-3xl font-bold mb-4 text-right ${darkMode ? "text-white" : ""}`}>
              نبذة تعريفية لموقع سورة قرآن
            </h2>

            <p className={`text-base leading-relaxed text-right mb-4 ${darkMode ? "text-white" : ""}`}>
              إن موقع Quran Karem هو امتداد للجهد الذي تم تأسيسه في عام 2025
              تحت اسم أسطر كموقع اسلامي يقدم شبكة تواصل اجتماعي توفر لطلاب العلم و
              الباحثين و المسلمين عموما منصة لطرح افكارهم وأبحاثهم و مقالاتهم،
              ويوفر لهم مساحة لمناقشة الطروحات العلمية ضمن حوارات هادفة و بناءة
              والذي تتوج بموقع مختص بالقرآن الكريم هو موقع القرآن الكريم   (
              <Link
                href="/"
                className="text-[#22a5ad] text-xl font-bold"
              >
                القرآن الكريم
              </Link>
              ) . كما يعتبر الموقع خادما للدعوة إلى الله تعالى وفق منهاج الكتاب و
              السنة.
            </p>

          </section>

          <hr className={`h-[2px] mb-3 ${darkMode ? "bg-[#5d5d5d]" : "bg-[#ddd]"}`} />

          {/* هدف الموقع */}
          <section className="mb-5">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 text-right  ${darkMode ? "text-white" : ""}`}>
              : هدف الموقع
            </h2>
            <p className={`text-base leading-relaxed text-right  ${darkMode ? "text-white" : ""}`}>
              إن أسرة موقع القرآن الكريم تطمح إلى تبليغ القرآن الكريم لكل الناس عملا
              بقول النبي صلى الله عليه وسلم "بلغوا عني ولو آية" و تتشرف بكونها
              خادما لكتاب الله العزيز و تطمح إلى تسهيل سبل العلم و المعرفة و نشر
              الدعوة إلى الله تعالى .
            </p>
          </section>

          <hr className={`h-[2px] mb-3 ${darkMode ? "bg-[#5d5d5d]" : "bg-[#ddd]"}`} />

          {/* الموضوعات الرئيسية */}
          <section className="mb-5">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 text-right ${darkMode ? "text-white" : ""}`}>
              : الموضوعات الرئيسية التي نتناولها
            </h2>
            <ul className={`list-none space-y-2 text-right ${darkMode ? "text-white" : ""}`}>
              <li>القرآن الكريم مكتوبا بعدة روايات بالرسم العثماني </li>
              <li>القرآن الكريم و علومه و تفسيره و القراءات القرآنية </li>
              <li>تسجيلات القرآن الكريم لأشهر قراء العالم الاسلامي </li>
              <li>تفاسير القرآن الكريم .</li>
              <li>
                كل ما يخدم الدين الاسلام الحنيف و يفيد المسلمين عموما و طلاب العلم
                خصوصا
              </li>
            </ul>
          </section>

          <hr className={`h-[2px] mb-3 ${darkMode ? "bg-[#5d5d5d]" : "bg-[#ddd]"}`} />

          {/* سياسة النشر */}
          <section className="mb-5">

            <h2 className={`text-2xl md:text-3xl font-bold mb-4 text-right ${darkMode ? "text-white" : ""}`}>
              : سياسة النشر
            </h2>

            <ul className={`list-none space-y-2 text-right ${darkMode ? "text-white" : ""}`}>

              <li>
                لدينا مجموعة من المباديء التي نتبعها ونؤمن بها فيما يخص المحتوى
                الذي ينشر على موقعنا، نؤمن أن وقت القاريء ثمين ونسعى إلى المحافظة
                على محتوى عالي الجودة على صفحات الموقع
              </li>

              <li>
                لملاحظاتكم واقتراحاتكم يمكنكم في أي وقت التواصل مع إدارة الموقع،
                باقتراحاتكم نرتقي و باهتمامكم نستمر و تزداد سعادتنا
              </li>

            </ul>

          </section>

          
        </div>

      </div>

    </div>


  )
}

export default InformationAboutUs