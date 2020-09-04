// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMask from 'v-mask'
import InputMask from 'vue-input-mask';
import App from './App'

Vue.use(VueMask);
Vue.component('input-mask', InputMask)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
