import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Playlists from '../views/Playlists.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/playlist/:id',
    name: 'Playlists',
    component: Playlists,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];
