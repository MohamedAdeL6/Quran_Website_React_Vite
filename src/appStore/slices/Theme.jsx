import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',  // usually keep slice name simple and lowercase
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;  // straightforward state update
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; // handy toggle action for convenience
    },
  },
});

// Export the actions for dispatching
export const { setDarkMode, toggleDarkMode } = themeSlice.actions;

// Export the reducer to use in your store
export default themeSlice.reducer;
