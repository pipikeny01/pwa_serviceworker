import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
//production 用這個
import "./registerServiceWorker";

//dev 用這個
//import "./devRegisterServiceWorker";

// axios.defaults.headers = {
//   Cache-Control: "no-cache",
//   Pragma: "no-cache",
//   Expires: "0",
// };

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
