import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import moment from 'moment';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);
export const Bus = new Vue();
Vue.config.productionTip = false;
Vue.filter('humanize', function (date) {
    return moment(date).format('MMMM Do YYYY');
});
Vue.filter('fdate', function (date) {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
});
new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map