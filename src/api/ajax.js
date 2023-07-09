import axios from "axios"
import store from "@/store";
//引入进度条
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
//axios实例
const requests = axios.create({
    baseURL:'/',
    timeout:5000,
});

//请求拦截器 
requests.interceptors.request.use(config=>{
    // //请求条
    // nProgress.start();
    // //携带uuid 游客身份
    // if(store.state.detail.uuid_token){
    //     config.headers.userTempId=store.state.detail.uuid_token
    // }
   
    //携带token
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
  
 
    return config;
})

//响应拦截器
requests.interceptors.response.use((response)=>{
    // nProgress.done();
    return response.data;
},(error)=>{
    return Promise.reject(new Error('failed'))
})






export default requests