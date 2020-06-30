import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueProgressBar from 'vue-progressbar';
import store from './store';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

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

const options = {
  color: '#1db954',
  failedColor: 'red',
  thickness: '3px',
  transition: {
    speed: '0.4s',
    termination: 400,
  },
  location: 'top',
  autoRevert: true,
  inverse: false,
};
Vue.use(VueProgressBar, options);

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios
    .post('/api/auth/me')
    .then((res) => {
      store.dispatch({
        payload: res.data
      });
    })
    .then(() => {
      new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount('#app');
    });
} else {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}