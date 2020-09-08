import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Register from '../views/RegisterUser.vue';
import Tracking from '../views/TrackingHistory.vue';

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (localStorage.getItem('LoginResult')) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
    alert('Unauthorized Access');
  }
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Sigup',
    component: Signup,
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: Register,
  },
  {
    path: '/tracking',
    name: 'TrackingHistory',
    component: Tracking,
  },
  {
    path: '/status',
    name: 'status',
    beforeEnter: guardMyroute,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Status.vue'),
    meta: { title: 'Status' },
  },
  {
    path: '/invoice/:id',
    name: 'invoice',
    beforeEnter: guardMyroute,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Invoice.vue'),
    meta: { title: 'Invoice' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
