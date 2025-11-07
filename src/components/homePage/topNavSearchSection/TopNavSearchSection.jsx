import { useSelector } from "react-redux";
import QuranLogo from "./QuranLogo/QuranLogo";
import NavigationTabs from "./navigationTabs/NavigationTabs";
import SearchBar from "./searchBar/SearchBar";

function TopNavSearchSection() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);


  return (
    <div className={`w-full flex justify-center items-center 
       ${darkMode ? "bg-[#000] border-b border-[#5d5d5d] pb-4" : "bg-[#22a5ad]"}`}>
      <div className={`container`}>
        <div className="w-full flex justify-center items-center">
          <div className={`w-full 2xl:w-2/3 flex flex-wrap justify-center items-center gap-9 py-7`}>
            <QuranLogo />
            <NavigationTabs />
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNavSearchSection
