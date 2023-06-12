import axios from "axios"
//引入进度条
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
//axios实例
const requests = axios.create({
    baseURL:'/api',
    timeout:5000,
});

//请求拦截器 
requests.interceptors.request.use(config=>{
    nProgress.start();

    return config;
})

//响应拦截器
requests.interceptors.response.use((response)=>{
    nProgress.done();
    return response.data;
},(error)=>{
    return Promise.reject(new Error('failed'))
})






export default requests