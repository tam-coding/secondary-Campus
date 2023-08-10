import axios from "axios"
//引入进度条
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
import {getUUID} from '@/utils/uuid_token'
import {getToken} from '@/utils/token'
//axios实例
const requests = axios.create({
    baseURL:'/',
    timeout:5000,
});

//请求拦截器 
requests.interceptors.request.use(config=>{
    // //请求条
    // nProgress.start();
    //携带uuid 游客身份

        // config.headers.uid=getUUID()
    
   
    // 携带token
    // if(store.state.user.token){
    //     config.headers.Authorization=store.state.user.token
    // }
    const token=getToken()
    if(token){
        config.headers.Authorization=token
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