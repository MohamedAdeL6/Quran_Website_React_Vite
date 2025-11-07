import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: [],
  error: "",
}
// eslint-disable-next-line react-refresh/only-export-components
export const fetchAzkar = createAsyncThunk(`AzkarData/fetchAzkar`, async (lang = "العربية") => {
  return axios.get('https://www.hisnmuslim.com/api/ar/husn_ar.json')
    .then(res => res.data[`${lang}`])
})

export const AzkarData = createSlice({
  name: 'AzkarData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAzkar.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAzkar.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = ""
    })
    builder.addCase(fetchAzkar.rejected, (state, action) => {
      state.loading = false
      state.data = [];
      state.error = action.error.message
    })
  }
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line react-refresh/only-export-components
export const { decrementAzkarCount } = AzkarData.actions

export default AzkarData.reducer

