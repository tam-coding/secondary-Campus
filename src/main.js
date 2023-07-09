import Vue from 'vue'
import App from './App.vue'

//引入路由
import router  from './router'

Vue.config.productionTip = false

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入store
import store from './store'
 //引入mock
 import  '@/mock/mockServe'

//暴露全局api
// import * as API from '@/api'

new Vue({
  render: h => h(App),
  router,
  store,
  //安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this

  }
}).$mount('#app')
