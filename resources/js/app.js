require('./bootstrap');
window.Vue = require('vue');
import router from './router';
import common from './common';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import moment from 'moment';
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('dddd, MMMM Do YYYY, h:mm a')
    }
});
Vue.use(ViewUI);
Vue.mixin(common);
Vue.component('mainapp',require('./components/main.vue').default);
const app = new Vue({
    el:'#app',
    router
})
