import * as types from '../mutation-types';

// state
export const state = {
  currentSong: {},
  isPlaying: true,
};

// getters
export const getters = {
  currentSong: (state) => state.currentSong,
  isPlaying: (state) => state.isPlaying,
};

export const mutations = {
  [types.SET_CURRENT_SONG](state, song) {
    state.currentSong = song;
  },
  [types.TOGGLE_IS_PLAYING](state, isPlaying) {
    state.isPlaying = isPlaying === null ? !state.isPlaying : isPlaying;
  },
};

export const actions = {
  setCurrentSong({
    commit
  }, payload) {
    commit(types.SET_CURRENT_SONG, payload);
  },
  toggleIsPlaying({
    commit
  }, payload = null) {
    commit(types.TOGGLE_IS_PLAYING, payload);
  }
};