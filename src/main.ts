import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
import vuetify from './plugins/vuetify';
import moment from 'moment';

import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export const Bus = new Vue();
Vue.config.productionTip = false;

Vue.filter('price', function(number: number) {
  if (isNaN(number)) {
    return ' ';
  }
  return '$ ' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

Vue.filter('curr', function(number: number) {
  if (isNaN(number)) {
    return ' ';
  }
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

Vue.filter('humanize', function(date: Date) {
  return moment(date).format('MMMM Do YYYY');
});

Vue.filter('fdate', function(date: Date) {
  return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
});

new Vue({
  router,
  vuetify,
  // store,
  render: (h) => h(App),
}).$mount('#app');
