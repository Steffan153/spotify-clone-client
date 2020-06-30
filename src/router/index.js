import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import routes from './routes';
import store from '../store/';
import { sync } from 'vuex-router-sync';

Vue.use(Meta);
Vue.use(Router);

const globalMiddleware = ['check-auth'];
const routeMiddleware = resolveMiddleware(require.context('../middlewares', false, /.*\.js$/));

const router = createRouter();
sync(store, router);

function createRouter() {
  const router = new Router({
    scrollBehavior,
    mode: 'history',
    routes,
  });

  router.beforeEach(beforeEach);
  router.afterEach(afterEach);

  return router;
}

async function beforeEach(to, from, next) {
  let components = [];

  try {
    components = await resolveComponents(
      router.getMatchedComponents({
        ...to,
      })
    );
  } catch (error) {
    if (/^Loading( CSS)? chunk (\d)+ failed\./.test(error.message)) {
      window.location.reload(true);
      return;
    }
  }

  if (components.length === 0) {
    return next();
  }

  // Start the loading bar.
  if (components[components.length - 1].loading !== false) {
    router.app.$nextTick(() => router.app.$children[0].$children[0].start());
  }

  // Get the middleware for all the matched components.
  const middleware = getMiddleware(components);

  // Call each middleware.
  callMiddleware(middleware, to, from, (...args) => {
    // Set the application layout only if "next()" was called with no args.
    if (args.length === 0) {
      router.app.setLayout(components[0].layout || '');
    }

    next(...args);
  });
}

async function afterEach() {
  await router.app.$nextTick();
  router.app.$children[0].$children[0].finish();
}

function callMiddleware(middleware, to, from, next) {
  const stack = middleware.reverse();

  const _next = (...args) => {
    if (args.length > 0 || stack.length === 0) {
      if (args.length > 0) {
        router.app.$children[0].$children[0].finish();
      }
      return next(...args);
    }

    const middleware = stack.pop();

    if (typeof middleware === 'function') {
      middleware(to, from, _next);
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next);
    } else {
      throw Error(`Undefined middleware [${middleware}]`);
    }
  };

  _next();
}

function resolveComponents(components) {
  return Promise.all(
    components.map((component) => {
      return typeof component === 'function' ? component() : component;
    })
  );
}

function getMiddleware(components) {
  const middleware = [...globalMiddleware];

  components
    .filter((c) => c.middleware)
    .forEach((component) => {
      if (Array.isArray(component.middleware)) {
        middleware.push(...component.middleware);
      } else {
        middleware.push(component.middleware);
      }
    });

  return middleware;
}

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

function resolveMiddleware(requireContext) {
  return requireContext
    .keys()
    .map((file) => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
    .reduce(
      (guards, [name, guard]) => ({
        ...guards,
        [name]: guard.default,
      }),
      {}
    );
}

export default router;
