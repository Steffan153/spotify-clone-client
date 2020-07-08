import * as types from '../mutation-types';

// state
export const state = {
  data: null,
  term: '',
  songs: {
    data: []
  },
  playlists: {
    data: []
  }
};

// getters
export const getters = {
  data: (state) => state.data,
  term: (state) => state.term,
};

export const mutations = {
  [types.SAVE_SEARCH](state, {
    data,
    term
  }) {
    state.data = data;
    state.term = term;
  },
  [types.CLEAR_SEARCH](state) {
    state.songs = null;
    state.playlists = null;
  },
  [types.SAVE_SEARCH_SONGS](state, songs) {
    state.songs = songs;
  },
  [types.SAVE_SEARCH_PLAYLISTS](state, playlists) {
    state.playlists = playlists;
  },
};

export const actions = {
  saveSearch({
    commit
  }, payload) {
    commit(types.SAVE_SEARCH, payload);
    commit(types.CLEAR_SEARCH);
  },
  saveSearchSongs({
    commit
  }, payload) {
    commit(types.SAVE_SEARCH_SONGS, payload);
  },
  saveSearchPlaylists({
    commit
  }, payload) {
    commit(types.SAVE_SEARCH_PLAYLISTS, payload);
  }
};