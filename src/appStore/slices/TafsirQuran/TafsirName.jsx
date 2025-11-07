import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tafsirName: [],
  specificTafsirName: [],
  error: ''
};

export const fetchTafsirName = createAsyncThunk(
  "TafsirName/fetchTafsirName",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.quran.com/api/v4/resources/tafsirs?language=ar`);
      if (!response.ok) throw new Error("Failed to fetch verses");
      const result = await response.json();
      console.log(result.tafsirs);
      return result.tafsirs
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchSpecificTafsirName = createAsyncThunk(
  "TafsirName/fetchSpecificTafsirName",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.quran.com/api/v4/resources/tafsirs?language=ar`);
      if (!response.ok) throw new Error("Failed to fetch verses");
      const result = await response.json();
      const filterTafsir = result.tafsirs.filter(el => el.language_name.toLowerCase() === lang)
      return filterTafsir
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const TafsirName = createSlice({
  name: "TafsirName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTafsirName.pending, (state) => {
        state.loading = true;
        state.tafsirName = [];
        state.error = "";
      })
      .addCase(fetchTafsirName.fulfilled, (state, action) => {
        state.loading = false;
        state.tafsirName = action.payload;
        state.error = "";
      })
      .addCase(fetchTafsirName.rejected, (state, action) => {
        state.loading = false;
        state.tafsirName = [];
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchSpecificTafsirName.pending, (state) => {
        state.loading = true;
        state.specificTafsirName = [];
        state.error = "";
      })
      .addCase(fetchSpecificTafsirName.fulfilled, (state, action) => {
        state.loading = false;
        state.specificTafsirName = action.payload;
        state.error = "";
      })
      .addCase(fetchSpecificTafsirName.rejected, (state, action) => {
        state.loading = false;
        state.specificTafsirName = [];
        state.error = action.payload || "Something went wrong";
      });
  }
});


export default TafsirName.reducer;
