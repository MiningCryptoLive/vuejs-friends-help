import "@babel/polyfill";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/axios";
import "./plugins/vue-progressbar";
import VueLocalStorage from 'vue-localstorage'
import feather from 'vue-icon'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import Helpers from "./helpers";
import {
  get,
  post
} from "./service/Api";
import VueTimeago from 'vue-timeago'
import vueDateFormat from 'vue-date-format'

const Lang = Vue.localStorage.get('lang') || 'en'
i18n.locale = Lang

Vue.use(VueLocalStorage, {
  bind: true
})

Vue.use(vueDateFormat)

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',
  locales: {
    'en': require('date-fns/locale/en'),
    'ru': require('date-fns/locale/ru')
  }
})

Vue.use(feather, 'v-icon')
Vue.prototype.get = get;
Vue.prototype.post = post;
Vue.mixin(Helpers);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");