import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Playlists from '../views/Playlists.vue';
import Library from '../views/Library.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import guest from '../middlewares/guest';
import auth from '../middlewares/auth';

export default [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
    beforeEnter: auth
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
    beforeEnter: guest
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: guest
  },
];