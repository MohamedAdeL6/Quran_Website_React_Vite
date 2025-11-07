import { configureStore } from "@reduxjs/toolkit";
import Theme from "../slices/Theme";
import PrayerTimesSlice from "../slices/PrayerTimesData"
import SoundQuranData from "../slices/soundQuranData/SoundQuranData";
import QuranReadingData from "../slices/QuranReadingData/QuranReadingData"
import QuranRecitersSlice from "../slices/QuranRecitersSlice";
import AzkarData from "../slices/AzkarData";
import SpecificAzkarData from "../slices/SpecificAzkarData";
import TafsirDataSlice from "../slices/TafsirQuran/TafsirSlice"
import TafsirsInformation from "../slices/TafsirQuran/TafsirsInformation";
import SurahsQuran from "../slices/TafsirQuran/SurahsQuran";
import versesQuran from "../slices/VersesQuran";
import TafsirVersesQuran from "../slices/TafsirQuran/TafsirVersesQuran"
import AudioPlayerSlice from "../slices/AudioPlayerSlice"
import QuranPagesSlice from "../slices/QuranPagesSlice"
import QuranDownloadPdfSlice  from "../slices/QuranDownloadPdfSlice";

export const store = configureStore({
  reducer: {
    darkMode: Theme,
    prayerTimes: PrayerTimesSlice,
    suraData: QuranReadingData,
    soundQuran: SoundQuranData,
    quranReciters: QuranRecitersSlice,
    azkar: AzkarData,
    specificAzkar: SpecificAzkarData,
    surahsQuran: SurahsQuran,
    tafsirSurah: TafsirDataSlice,
    tafsirInfo: TafsirsInformation,
    versesQuran: versesQuran,
    tafsirVerses: TafsirVersesQuran,
     audioPlayer: AudioPlayerSlice,
     surahPage: QuranPagesSlice,
     QuranPdfDownloading: QuranDownloadPdfSlice
  },
});

