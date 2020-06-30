import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Playlists from '../views/Playlists.vue';
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
];
