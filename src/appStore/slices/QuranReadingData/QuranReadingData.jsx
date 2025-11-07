// src/redux/quranSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  data: null,
  surahList: [], // ← ADD THIS LINE
  jazList: [], // ← ADD THIS LINE
  error: '',
}
// Async thunk
export const fetchSurah = createAsyncThunk('QuranReadingData/fetchSurah', async (surahNumber) => {
  const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
  const data = await response.json();
  return data.data;
});


// Async thunk
export const fetchSurahSelection = createAsyncThunk('QuranReadingData/fetchSurahSelection', async () => {
  const response = await fetch(`https://api.alquran.cloud/v1/surah`);
  const data = await response.json();
  return data.data
});

// Async thunk
export const fetchJazSelection = createAsyncThunk('QuranReadingData/fetchJazSelection', async (juz) => {
  const response = await fetch(`https://api.alquran.cloud/v1/juz/${juz}`);
  const data = await response.json();
  return data.data
});


const QuranReadingData = createSlice({
  name: 'QuranReadingData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurah.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurah.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSurah.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })



      // ADDITIONAL CASES FOR fetchSurahSelection
      .addCase(fetchSurahSelection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurahSelection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.surahList = action.payload; // Store the full list of surahs in a new property
      })
      .addCase(fetchSurahSelection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      

      // ADDITIONAL CASES FOR fetchSurahSelection
      .addCase(fetchJazSelection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJazSelection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jazList = action.payload; // Store the full list of surahs in a new property
      })
      .addCase(fetchJazSelection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });


      
  },

});

export default QuranReadingData.reducer;

