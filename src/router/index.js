import Vue from 'vue'
import VueRouter from  'vue-router'
import routes from './routes.js'
Vue.use(VueRouter)


//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location,resolve,reject){
//传了回调 即resolve  reject存在的情况下：
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,() => {},() => {})
    }
}

let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,() => {},() => {})
    }
}

export default new VueRouter({
    routes,
    scrollBehavior () {
        return { y: 0 }
      }
})