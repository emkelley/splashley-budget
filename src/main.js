import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
