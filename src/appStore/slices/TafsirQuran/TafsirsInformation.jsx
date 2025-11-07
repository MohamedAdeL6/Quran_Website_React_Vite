import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tafsirInfo: [],
  error: ''
}


export const fetchTafsirsInfo = createAsyncThunk("TafsirsInformation/fetchTafsirName", async (selectedTafsirLang) => {

  const response = await fetch("https://api.quran.com/api/v4/resources/tafsirs?language=ar")
  const result = await response.json();
  if (!selectedTafsirLang) {
    return result.tafsirs
  }
  else {
    const specificTafsirLang = result.tafsirs.filter(el => el.language_name.toLowerCase() === selectedTafsirLang) || []
    return { specificTafsirLang, allTafsirName: result.tafsirs }
  }

})



const TafsirsInformation = createSlice({
  name: "TafsirsInformation",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTafsirsInfo.pending, (state) => {
      state.loading = true
      state.tafsirInfo = []
      state.error = ""
    })
    builder.addCase(fetchTafsirsInfo.fulfilled, (state, action) => {
      state.loading = false
      state.tafsirInfo = action.payload
      state.error = ""
    })
    builder.addCase(fetchTafsirsInfo.rejected, (state, action) => {
      state.loading = false
      state.tafsirInfo = []
      state.error = action.error.message
    })

  }
})




export default TafsirsInformation.reducer;