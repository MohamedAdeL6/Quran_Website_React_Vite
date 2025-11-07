import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allVerses: [],
  error: ''
};

export const fetchAllVersesQuran = createAsyncThunk(
  "VersesQuran/fetchAllVersesQuran",
  async ({ fromAyah, toAyah, selectSurahNumber }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectSurahNumber}`);
      if (!response.ok) throw new Error("Failed to fetch verses");
      const result = await response.json();
      const selectedVerses = result.data.ayahs
      const verses = selectedVerses.filter(el => el.numberInSurah >= fromAyah && el.numberInSurah <= toAyah)
      return verses
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const VersesQuran = createSlice({
  name: "VersesQuran",
  initialState,
  reducers: {
     clearAllVerses: (state) => {
      state.allVerses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVersesQuran.pending, (state) => {
        state.loading = true;
        state.allVerses = [];
        state.error = "";
      })
      .addCase(fetchAllVersesQuran.fulfilled, (state, action) => {
        state.loading = false;
        state.allVerses = action.payload;
        state.error = "";
      })
      .addCase(fetchAllVersesQuran.rejected, (state, action) => {
        state.loading = false;
        state.allVerses = [];
        state.error = action.payload || "Something went wrong";
      });
  }
});

export const { clearAllVerses } = VersesQuran.actions;

export default VersesQuran.reducer;
