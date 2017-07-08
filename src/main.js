// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./store";
import fastclick from "fastclick";
import VueLazyload from 'vue-lazyload';
//基础样式
import "./common/stylus/index.styl";
// import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.css';


Vue.use(VueLazyload, {
  loading : require('./common/image/default.png')
});

Vue.config.productionTip = false
// Vue.use(ElementUI)
//解决300ms延迟
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render : h => h(App)
})
