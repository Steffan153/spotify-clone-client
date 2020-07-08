import store from '../store';

export default (to, from, next) => {
  if (store.getters["auth/isAdmin"]) next();
  else next({
    name: "Home"
  });
};