import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSurahId: null,
  isPlaying: false,
  isMuted: false,
  currentAudioSrc: "",
  audioSources: {}, 
};

const AudioPlayerSlice = createSlice({
  name: 'AudioPlayerSlice',
  initialState,
   reducers: {
    setSelectedSurahIdSlice: (state, action) => {
      state.selectedSurahId = action.payload;
    },
    setIsPlayingSlice: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentAudioSrc: (state, action) => {
      state.currentAudioSrc = action.payload;
    },
    setAudioSources: (state, action) => {
      state.audioSources = action.payload;
    },
    setIsMuted: (state, action) => {
      state.isMuted = action.payload;
    },
  },
});

export const {
  setSelectedSurahIdSlice,
  setIsPlayingSlice,
  setIsMuted,
  setAudioSources,
  setCurrentAudioSrc,
} = AudioPlayerSlice.actions;

export default AudioPlayerSlice.reducer;
