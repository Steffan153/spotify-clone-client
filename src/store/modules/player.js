import * as types from '../mutation-types';

// state
export const state = {
  currentSong: {},
};

// getters
export const getters = {
  currentSong: (state) => state.currentSong,
};

export const mutations = {
  [types.SET_CURRENT_SONG](state, song) {
    state.currentSong = song;
  },
};

export const actions = {
  setCurrentSong({
    commit
  }, payload) {
    commit(types.SET_CURRENT_SONG, payload);
  },
};