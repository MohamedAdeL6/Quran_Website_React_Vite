import { createSlice } from "@reduxjs/toolkit";
import QuranReciters from "../../data/quranRecitersData/QuranRecitersData.json"



const initialState = {
  loading: false,
  data: QuranReciters,
  error: "",
}

export const QuranRecitersSlice = createSlice({

  name: "QuranRecitersSlice",
  initialState,
  reducers: {
    handleStyleReciters: (state, action) => {
      state.data = QuranReciters.filter(reciter => reciter.style === action.payload)
    }
  }
})

// eslint-disable-next-line react-refresh/only-export-components
export const { handleStyleReciters } = QuranRecitersSlice.actions

export default QuranRecitersSlice.reducer
