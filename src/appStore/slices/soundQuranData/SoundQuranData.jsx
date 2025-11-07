import soundQuran from '../../../data/soundQuran/NewDataQuran.json'

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: soundQuran,
}

export const SoundQuranData = createSlice({
  name: 'SoundQuranData',
  initialState,
  reducers: {
    retrieveSouraQuran: (state, action) => {
      state.value = [action.payload]
    }
  },
})


export default SoundQuranData.reducer

