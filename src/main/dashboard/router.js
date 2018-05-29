
import DashboardView from './dashboard.vue';

export default [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: ':anything',
    redirect: {
      name: 'dashboard',
    }
  },
  {
    path: '*',
    redirect: {
      name: 'dashboard',
    }
  }
];
