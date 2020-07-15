import Vue from 'nativescript-vue'
import Login from './components/Login'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import * as http from "http";
import routes from "./routes";
import BackendService from "./services/backend-service";

// Prints Vue logs when --env.production is *NOT* set while building
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/css/font-awesome.css',
  'ion': './assets/css/ionicons.css'
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

const backendService = new BackendService();
Vue.prototype.$backendService = backendService;
// Vue.config.silent=false;
new Vue({
  render: h => h("frame", [h(backendService.isLoggedIn() ? routes.home : routes.login)])
}).$start();
