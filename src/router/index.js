import Vue from 'vue';
import Router from 'vue-router';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import AddMonitor from 'components/AddMonitor';
import Chart from 'components/Chart';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/add-monitor',
      name: 'Add-Monitor',
      component: AddMonitor
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '*',
      redirect: { name: '/' }
    }
  ],
  mode: 'history'
})
