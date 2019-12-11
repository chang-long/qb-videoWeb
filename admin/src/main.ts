import Vue from 'vue'
import axios from 'axios';

import App from './App.vue'
import './plugins/element'
import './plugins/avue'

import router from './router'

// import EleForm from 'vue-ele-form';
// Vue.use(EleForm)

Vue.config.productionTip = false

const http = axios.create({
  baseURL: 'http://localhost:3000'
})
//使用了Avue的上传，Avue中的上传使用$httpajax作axios请求调用
Vue.prototype.$httpajax = http;//
Vue.prototype.$http = http;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
