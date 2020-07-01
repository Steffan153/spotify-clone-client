import store from '../store';

export default (to, from, next) => {
  if (!store.getters["auth/check"]) next();
  else next({
    name: "Home"
  });
};