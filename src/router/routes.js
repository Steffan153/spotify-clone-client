import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Playlists from '../views/Playlists.vue';
import Category from '../views/Category.vue';
import Library from '../views/Library.vue';
import LikesSongs from '../views/LikesSongs.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
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
    path: '/library/songs',
    name: 'Library Songs',
    component: LikesSongs,
    beforeEnter: auth
  },
  {
    path: '/playlist/:id',
    name: 'Playlists',
    component: Playlists,
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
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
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: auth,
  }
];