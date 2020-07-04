import * as types from '../mutation-types';

// state
export const state = {
  likes: null,
};

// getters
export const getters = {
  songs: (state) => state.likes.songs,
  playlists: (state) => state.likes.playlists,
};

export const mutations = {
  [types.SAVE_LIKES](state, payload) {
    state.likes = payload;
  },
  [types.REMOVE_LIKED_PLAYLIST](state, playlist) {
    state.likes = {
      ...state.likes,
      playlists: state.likes.playlists.filter(p => p.id !== playlist.id)
    };
  },
  [types.ADD_LIKED_PLAYLIST](state, playlist) {
    const newLikes = {
      ...state.likes,
      playlists: [...state.likes.playlists, playlist],
    };
    state.likes = newLikes;
  },
  [types.REMOVE_LIKED_SONG](state, song) {
    state.likes = {
      ...state.likes,
      songs: state.likes.songs.filter(s => s.id !== song.id)
    };
  },
  [types.ADD_LIKED_SONG](state, song) {
    const newLikes = {
      ...state.likes,
      songs: [...state.likes.songs, song],
    };
    state.likes = newLikes;
  },
};

export const actions = {
  saveAllLikes({
    commit
  }, payload) {
    commit(types.SAVE_LIKES, payload);
  },
  toggleLike({
    commit
  }, {
    isLiked,
    playlist
  }) {
    if (!isLiked) {
      commit(types.REMOVE_LIKED_PLAYLIST, playlist);
    } else {
      commit(types.ADD_LIKED_PLAYLIST, playlist);
    }
  },

  toggleLikeSong({
    commit
  }, {
    isLiked,
    song
  }) {
    if (!isLiked) {
      commit(types.REMOVE_LIKED_SONG, song);
    } else {
      commit(types.ADD_LIKED_SONG, song);
    }
  },
};