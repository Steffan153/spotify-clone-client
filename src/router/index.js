import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import routes from './routes';
import store from '../store/';
import { sync } from 'vuex-router-sync';

Vue.use(Meta);
Vue.use(Router);

const router = new Router({
  scrollBehavior,
  mode: 'history',
  routes,
});
sync(store, router);

function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }

  if (to.hash) {
    return {
      selector: to.hash,
    };
  }

  const [component] = router
    .getMatchedComponents({
      ...to,
    })
    .slice(-1);

  if (component && component.scrollToTop === false) {
    return {};
  }

  return {
    x: 0,
    y: 0,
  };
}

export default router;
