import DownloadQuran from "./DownloadQuran/DownloadQuran";
import PrayerTimes from "./PrayerTimes/PrayerTimes";
import TopNavSearchSection from "./topNavSearchSection/TopNavSearchSection";


const HomePage = () => {
  return (
    <>
      <TopNavSearchSection />
      <PrayerTimes />
      <DownloadQuran />
    </>
  );
};

export default HomePage;



