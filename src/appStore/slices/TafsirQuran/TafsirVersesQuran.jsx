import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tafsirVerses: [],
  error: ''
}

export const fetchTafsirVersesQuran = createAsyncThunk(
  "TafsirVersesQuran/fetchTafsirVersesQuran",
  async ({ selectTafsirSlug, selectSurahNumber, fromAyah, toAyah }, { rejectWithValue }) => {

    console.log(selectTafsirSlug);
    console.log(selectSurahNumber)
    console.log(fromAyah);
    console.log(toAyah);

    try {
      const requests = [];

      for (let i = fromAyah; i <= toAyah; i++) {
        const url = `https://api.quran.com/api/v4/tafsirs/${selectTafsirSlug}/by_ayah/${selectSurahNumber}:${i}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed at ayah ${i}`);
        }

        const result = await response.json();
        requests.push(result); 
      }

      console.log(requests.map(el => el.tafsir));

      return requests.map(el => el.tafsir);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);




const TafsirVersesQuran = createSlice({
  name: "TafsirVersesQuran",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTafsirVersesQuran.pending, (state) => {
      state.loading = true
      state.tafsirVerses = []
      state.error = ""
    })
    builder.addCase(fetchTafsirVersesQuran.fulfilled, (state, action) => {
      state.loading = false
      state.tafsirVerses = action.payload
      state.error = ""
    })
    builder.addCase(fetchTafsirVersesQuran.rejected, (state, action) => {
      state.loading = false
      state.tafsirVerses = []
      state.error = action.error.message
    })

  }
})


export default TafsirVersesQuran.reducer;





// ------------------------ anther function fetch  tafsir ayahs ------------------------
// export const fetchTafsirVersesQuran = createAsyncThunk("TafsirVersesQuran/fetchTafsirVersesQuran", async (
//   { selectTafsirSlug, selectSurahNumber, fromAyah, toAyah }, { rejectWithValue }) => {
//   try {
//     const response = await fetch(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${selectTafsirSlug}/${selectSurahNumber}.json`)
//     if (!response.ok) throw new Error("Failed to fetch verses");
//     const result = await response.json();
//     const versers = result.ayahs.filter(ayah => ayah.ayah >= fromAyah && ayah.ayah <= toAyah)
//     const versersArranged = versers.sort((a, b) => a.ayah - b.ayah)
//     console.log(versers);
//     return versersArranged
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }

// })















