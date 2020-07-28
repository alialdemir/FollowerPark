/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


// Tailwind
import '@/assets/css/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faChartLine,
    faClipboardList,

    faComments,
    faIdBadge,
    faRobot,
    faShieldVirus,
    faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'material-icons/iconfont/material-icons.css'; //Material Icons
// PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// VeeValidate
import VeeValidate from 'vee-validate';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer';
import VueSmoothScroll from 'vue2-smooth-scroll';
// Vuesax Component Framework
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; // Vuesax
// Theme Configurations
import '../themeConfig.js';
import App from './App.vue';
// Styles: SCSS
import './assets/scss/main.scss';
// axios
import axios from "./axios.js";
// Globally Registered Components
import './globalComponents.js';
// Vue Router
import router from './router';
// Vuex Store
import store from './store/store';

Vue.use(Vuesax)


Vue.prototype.$http = axios












Vue.use(VeeValidate);


Vue.use(VueHammer)




// Feather font icon
require('./assets/css/iconfont.css')


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_API_MAP_KEY,
        libraries: 'places',
    },
    installComponents: true
});


Vue.use(VueSmoothScroll, {
    updateHistory: false,
})


library.add(faClipboardList)
library.add(faRobot)
library.add(faComments)
library.add(faIdBadge)
library.add(faChartLine)
library.add(faShieldVirus)
library.add(faSignInAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')