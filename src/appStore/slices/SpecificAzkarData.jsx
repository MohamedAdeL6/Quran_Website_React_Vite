import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	loading: false,
	data: [],
	error: "",
}
// eslint-disable-next-line react-refresh/only-export-components
export const fetchSpecificAzkar = createAsyncThunk(`SpecificAzkarData/fetchSpecificAzkar`, async (obj = { url: "https://www.hisnmuslim.com/api/ar/27.json", title: "أذكار الصباح والمساء" }) => {
	return axios.get(`${obj.url}`)
		.then(res => res.data[`${obj.title}`])
})

export const SpecificAzkarData = createSlice({
	name: 'SpecificAzkarData',
	initialState,
	reducers: {
		// Reducer for decrementing Azkar count
		decrementAzkarCount: (state, action) => {
			const index = action.payload;
			if (state.data[index] && state.data[index].REPEAT > 0) {
				state.data[index].REPEAT -= 1; // Directly mutate via Immer
			}
		},
		// Reducer for reseting Azkar count
		resetAzkarCount: (state, action) => {
			const index = action.payload;
			if (state.data[index].REPEAT <= 0) {
				state.data[index].REPEAT = state.data[index].originalCounts;
			}
		},
		// Reducer for Store All Azkar REPEAT
		storeOriginalCounts: (state) => {
			state.data.forEach((azkar, index) => {
				state.data[index].originalCounts = azkar.REPEAT;
			});
		},


	},
	extraReducers: (builder) => {
		builder.addCase(fetchSpecificAzkar.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchSpecificAzkar.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = ""
		})

		builder.addCase(fetchSpecificAzkar.rejected, (state, action) => {
			state.loading = false
			state.data = [];
			state.error = action.error.message
		})

	}
})

// Action creators are generated for each case reducer function
// eslint-disable-next-line react-refresh/only-export-components
export const { decrementAzkarCount, resetAzkarCount, storeOriginalCounts } = SpecificAzkarData.actions

export default SpecificAzkarData.reducer

