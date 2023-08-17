import Vue from 'vue'
import App from './App.vue'

//引入路由
import router  from './router'

Vue.config.productionTip = false

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$alert = ElementUI.MessageBox.alert;
//引入store
// import store from './store'
 //引入mock
 import  '@/mock/mockServe'

// 暴露全局api
import * as API from '@/api'
Vue.prototype.$API=API


new Vue({
  render: h => h(App),
  router,

  //安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
    this.$bus.isdot=0
  }
}).$mount('#app')
