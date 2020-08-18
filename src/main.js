import './rem/rem';
import Vue from 'vue';
import 'vue-awesome-mui/mui/dist/css/mui.css';
import App from './App.vue';
// import inputUp from './service/inputUp';
import router from './router';
import store from './store';
import './router/beforeRouteLeave';
import 'vue-mini-player/lib/vue-mini-player.css'
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
});

