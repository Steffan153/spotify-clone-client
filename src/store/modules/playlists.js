import * as types from '../mutation-types';

// state
export const state = {
  playlists: null,
};

// getters
export const getters = {
  playlists: (state) => state.playlists,
};

export const mutations = {
  [types.SAVE_PLAYLISTS](state, playlists) {
    state.playlists = playlists;
  },
};

export const actions = {
  savePlaylists({
    commit
  }, payload) {
    commit(types.SAVE_PLAYLISTS, payload);
  },
};