import QuranPdf from '../../data/DataQuranDownload/DataQuranDownload'

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: QuranPdf,
}

export const QuranDownloadPdfSlice = createSlice({
  name: 'QuranDownloadPdfSlice',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
// export const {} = QuranDownloadPdfSlice.actions

export default QuranDownloadPdfSlice.reducer