import { createSlice } from "@reduxjs/toolkit";
import QuranData from "../../../data/Quran.json"

const initialState = {
  loading: false,
  data: QuranData,
  error: "",
  selectedSurah: null,
  selectedAyahs: [],
  selectedAllSurahs: [],
};


export const TafsirDataSlice = createSlice({
  name: "TafsirDataSlice",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    fetchAllSurahs: (state, action) => {
      const allSurah = state.data.map(el => el.name1);
      state.selectedAllSurahs = allSurah || [];
    },

    fetchSurah: (state, action) => {
      const surahId = action.payload;
      const foundSurah = state.data.find((surah) => surah.id === surahId);
      state.selectedSurah = foundSurah || [];
    },

    fetchAyahs: (state, action) => {
      const { surahId, fromAyah, toAyah } = action.payload;
      const surah = state.data.find((surah) => surah.id === surahId);

      if (!surah) {
        state.selectedAyahs = [];
        return;
      }

      // const ayahsInRange = surah.array.slice(fromAyah - 1, toAyah + 1);
      const ayahsInRange = surah.array.filter(
        (ayah) => ayah.id >= fromAyah && ayah.id <= toAyah
      );
      state.selectedAyahs = ayahsInRange;
    }

  },

});

// eslint-disable-next-line react-refresh/only-export-components
export const { fetchSurah, fetchAyahs, fetchAllSurahs } = TafsirDataSlice.actions;


export default TafsirDataSlice.reducer;




























