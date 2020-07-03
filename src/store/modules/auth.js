import axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../mutation-types';

// state
export const state = {
  user: null,
  token: Cookies.get('token'),
};

// getters
export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  check: (state) => state.user !== null,
};

export const mutations = {
  [types.SAVE_TOKEN](state, {
    access_token
  }) {
    Cookies.set('token', access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  },
  [types.SAVE_USER](state, user) {
    state.user = user;
  },
  [types.LOGIN_USER](state, {
    user,
    access_token
  }) {
    Cookies.set('token', access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    state.user = user;
  },

  [types.FETCH_USER_SUCCESS](state, {
    user
  }) {
    state.user = user;
  },

  // eslint-disable-next-line no-unused-vars
  [types.FETCH_USER_FAILURE](_s) {
    Cookies.remove('token');
    axios.defaults.headers.common['Authorization'] = null;
  },

  [types.LOGOUT](state) {
    Cookies.remove('token');
    axios.defaults.headers.common['Authorization'] = null;
    state.user = null;
  },
};

export const actions = {
  login({
    commit
  }, payload) {
    commit(types.LOGIN_USER, payload);
  },
  saveToken({
    commit
  }, payload) {
    commit(types.SAVE_TOKEN, payload);
  },
  saveUser({
    commit
  }, {
    user
  }) {
    commit(types.SAVE_USER, user);
  },
  async fetchUser({
    commit
  }) {
    try {
      const {
        data
      } = await axios.post('/api/auth/me');

      commit(types.FETCH_USER_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_USER_FAILURE);
    }
  },

  updateUser({
    commit
  }, payload) {
    commit(types.UPDATE_USER, payload);
  },

  async logout({
    commit
  }) {
    try {
      await axios.post('/api/auth/logout');
      // eslint-disable-next-line no-empty
    } catch (e) {}

    commit(types.LOGOUT);
  },
};