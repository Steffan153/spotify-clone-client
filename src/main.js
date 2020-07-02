import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueProgressBar from 'vue-progressbar';
import store from './store';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import {
  getAllPlaylists
} from './api/playlists';
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

let token = cookie.get('token');
if (token) {
  const jwt_secret = process.env.VUE_APP_JWT_SECRET;
  jwt.verify(token, jwt_secret, function (err, decoded) {
    if (err) {
      token = null;
      cookie.remove('token');
      return;
    }
    if (
      decoded.iss !== `${process.env.VUE_APP_API_BASE_URL}/api/auth/login` &&
      decoded.iss !== `${process.env.VUE_APP_API_BASE_URL}/api/auth/register`
    ) {
      token = null;
      cookie.remove('token');
      return;
    }
  });
}

Vue.use(VueProgressBar, {
  color: '#1db954',
  failedColor: 'red',
  thickness: '3px',
  transition: {
    speed: '0.4s',
    termination: 400,
  },
  location: 'top',
});
Vue.use(infiniteScroll);

const mountApp = () => new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

const loadInitialData = () => getAllPlaylists().then(data => {
  store.dispatch('playlists/savePlaylists', data);
});

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios
    .post('/api/auth/me')
    .then(({
      data
    }) => {
      store.dispatch('auth/saveUser', data);
      loadInitialData();
    }).then(() => mountApp());
} else {
  loadInitialData().then(() => mountApp());
}