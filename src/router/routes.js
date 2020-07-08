// Playlists
import CategoryIndex from '../views/dashboard/category/Index.vue';
import CategoryAdd from '../views/dashboard/category/Add.vue';
import CategoryEdit from '../views/dashboard/category/Edit.vue';

// Playlists
import PlaylistIndex from '../views/dashboard/playlist/Index.vue';
import PlaylistAdd from '../views/dashboard/playlist/Add.vue';
import PlaylistEdit from '../views/dashboard/playlist/Edit.vue';

// Playlists
import SongIndex from '../views/dashboard/song/Index.vue';
import SongAdd from '../views/dashboard/song/Add.vue';
import SongEdit from '../views/dashboard/song/Edit.vue';


const middlewaresRequireContext = require.context('../middlewares', false, /.*\.js$/);
const middlewares = middlewaresRequireContext
  .keys()
  .map((file) => [file.replace(/(^.\/)|(\.js$)/g, ''), middlewaresRequireContext(file)])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true;
    }
    return {
      ...modules,
      [name]: module.default
    };
  }, {});

const pagesRequireContext = require.context('../views', false, /.*\.vue$/);
const pages = pagesRequireContext
  .keys()
  .map((file) => [file.replace(/(^.\/)|(\.vue$)/g, ''), pagesRequireContext(file)])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true;
    }
    return {
      ...modules,
      [name]: module.default
    };
  }, {});




const makeAdminRoute = route => {
  return {
    ...route,
    beforeEnter: middlewares.admin,
    exact: true,
    path: '/dashboard' + route.path
  };
}

export default [{
    path: '/',
    name: 'Home',
    component: pages.Home
  },
  {
    path: '/search',
    name: 'Search',
    component: pages.Search,
  },
  {
    path: '/search/songs',
    name: 'SearchSongs',
    component: pages.SearchSongs,
  },
  {
    path: '/search/playlists',
    name: 'SearchPlaylists',
    component: pages.SearchPlaylists,
  },
  {
    path: '/library',
    name: 'Library',
    component: pages.Library,
    beforeEnter: middlewares.auth
  },
  {
    path: '/library/songs',
    name: 'Library Songs',
    component: pages.LikesSongs,
    beforeEnter: middlewares.auth
  },
  {
    path: '/playlist/:id',
    name: 'Playlists',
    component: pages.Playlists,
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: pages.Category,
  },
  {
    path: '/login',
    name: 'Login',
    component: pages.Login,
    beforeEnter: middlewares.guest
  },
  {
    path: '/register',
    name: 'Register',
    component: pages.Register,
    beforeEnter: middlewares.guest
  },
  {
    path: '/profile',
    name: 'Profile',
    component: pages.Profile,
    beforeEnter: middlewares.auth,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: PlaylistIndex,
    beforeEnter: middlewares.admin,
  },
  makeAdminRoute({
    path: '/categories',
    name: 'Categories.index',
    component: CategoryIndex,
  }),
  makeAdminRoute({
    path: '/categories/add',
    name: 'Categories.add',
    component: CategoryAdd,
  }),
  makeAdminRoute({
    path: '/categories/:id/edit',
    name: 'Categories.edit',
    component: CategoryEdit,
  }),
  makeAdminRoute({
    path: '/playlists',
    name: 'Playlists.index',
    component: PlaylistIndex,
  }),
  makeAdminRoute({
    path: '/playlists/add',
    name: 'Playlists.add',
    component: PlaylistAdd,
  }),
  makeAdminRoute({
    path: '/playlists/:id/edit',
    name: 'Playlists.edit',
    component: PlaylistEdit,
  }),
  makeAdminRoute({
    path: '/songs',
    name: 'Songs.index',
    component: SongIndex,
  }),
  makeAdminRoute({
    path: '/songs/add',
    name: 'Songs.add',
    component: SongAdd,
  }),
  makeAdminRoute({
    path: '/songs/:id/edit',
    name: 'Songs.edit',
    component: SongEdit,
  }),
];