// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Functions from './classes/functions';

let user = Functions.checkAuth();

user.then((user) => {
  router.beforeEach((to, from, next) => {
    if (to.path === '/login' && user) {
      next('/');
    } else if (to.path !== '/login' && !user) {
      next('/login');
    } else {
      next();
    }
  });

  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
      App
    }
  });
}).catch((error) => {
  console.log(error);
});
