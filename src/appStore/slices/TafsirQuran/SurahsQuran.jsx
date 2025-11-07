import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allSurahs: [],
  error: ''
}


export const fetchAllSurahs = createAsyncThunk("SurahsQuran/fetchAllSurahs", async () => {
  const response = await fetch("https://api.alquran.cloud/v1/surah")
  const result = await response.json();
  return result.data
})


const SurahsQuran = createSlice({
  name: "SurahsQuran",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllSurahs.pending, (state) => {
      state.loading = true
      state.allSurahs = []
      state.error = ""
    })
    builder.addCase(fetchAllSurahs.fulfilled, (state, action) => {
      state.loading = false
      state.allSurahs = action.payload
      state.error = ""
    })
    builder.addCase(fetchAllSurahs.rejected, (state, action) => {
      state.loading = false
      state.allSurahs = []
      state.error = action.error.message
    })

  }
})




export default SurahsQuran.reducer;