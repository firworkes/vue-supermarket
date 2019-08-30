import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入全局样式
import 'normalize.css'
//公共样式
import './assets/style/conmon.css'

//引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入qs
// import '../node_modules/qs/dist/qs'
//引入axios
import axios from 'axios'

Vue.prototype.$axios=axios

//全局注册
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
