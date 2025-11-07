import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  surahPage: [], // ← ADD THIS LINE
  allSurahs: [],
  error: '',
}



export const fetchSurahOptional = createAsyncThunk(
  'QuranPagesSlice/fetchSurahOptional',
  async (surahNumber) => {
    const url = surahNumber
      ? `https://api.alquran.cloud/v1/surah/${surahNumber}`
      : `https://api.alquran.cloud/v1/surah`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.code !== 200) {
        throw new Error(data.status || 'Failed to fetch');
      }
      return data.data;
    } catch (error) {
      ;
      throw error;
    }
  }
);




// Async thunk
export const fetchSurahPage = createAsyncThunk('QuranPagesSlice/fetchSurahPage', async ({ type, selectedNumber }) => {
  const response = await fetch(`https://api.alquran.cloud/v1/${type}/${parseInt(selectedNumber)}/quran-uthmani`);
  const data = await response.json();

  return data.data.ayahs;
});



const QuranPagesSlice = createSlice({
  name: 'QuranPagesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ADDITIONAL CASES FOR fetchSurahSelection
      .addCase(fetchSurahOptional.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurahOptional.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allSurahs = action.payload; // Store the full list of surahs in a new property
      })
      .addCase(fetchSurahOptional.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })



      // ADDITIONAL CASES FOR fetchSurahSelection
      .addCase(fetchSurahPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurahPage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.surahPage = action.payload; // Store the full list of surahs in a new property
      })
      .addCase(fetchSurahPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },

});

export default QuranPagesSlice.reducer;

