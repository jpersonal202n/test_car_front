import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

//require('./plugins/veevalidate');

// import VueEvent from './utils/VueEvent';
// window.VueEvent = new VueEvent();

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
