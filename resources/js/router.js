import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import firstpage from './components/pages/myFirstPage';
import secondpage from './components/pages/mySecondPage';
import hooks from './components/pages/basic/hooks';
import methods from './components/pages/basic/methods';
import home from './components/pages/home';
import tags from './admin/pages/tags';
import category from './admin/pages/category';

const routes = [
    {
        path:'/',
        component:home
    },
    {
        path:'/tags',
        component:tags
    },
    {
        path:'/category',
        component:category
    },
    {
        path:'/my-new-Page',
        component:firstpage
    },
    {
        path:'/my-new-second-Page',
        component:secondpage
    },
    {
        path:'/hooks',
        component:hooks
    },
    {
        path:'/methods',
        component:methods
    }
]

export default new Router({
    mode:'history',
    routes
})
