import Vue from 'vue'
import App from './App.vue'

//引入路由
import router  from './router'
//全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
Vue.config.productionTip = false

//unitTest
// import { reqCategoryList } from '@/api'
// reqCategoryList();
// import {reqGetSearchInfo} from '@/api'
// reqGetSearchInfo({})


//引入store
import store from './store'
 //引入mock
 import  '@/mock/mockServe'
 //引入swiper.css
import "swiper/css/swiper.css"


new Vue({
  render: h => h(App),
  router,
  store,
  //安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
