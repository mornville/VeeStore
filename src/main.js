import Vue from "vue";
import App from "./App.vue";
import VueFuse from 'vue-fuse'


Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

Vue.use(VueFuse);