import {reqLoginCode,reqCodeLogin,reqPasswordLogin} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'

const state={
   loginCode:'',
   token:getToken(),
}
const actions={
    //获取验证码
    async getLoginCode({commit},phone){
        
        let result = await reqLoginCode(phone)
        // console.log(result);
        if(result.code==200){
            commit("GETLOGINCODE",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("获取验证码失败"))
        }
    },
    //验证码登录 注册
    async getCodeLogin({commit},data){
        let result=await reqCodeLogin(data)
        if(result.code==200){
            commit("TOKEN",result.data)
            setToken(result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("登录失败"))
        }
    },
    //密码登录
    async getPasswordLogin({commit},data){
        let result = await reqPasswordLogin(data)
        if(result.code==200){
            commit("TOKEN",result.data)
            setToken(result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("登录失败"))
        }
    }
}
const mutations={
    GETLOGINCODE(state,loginCode){
        state.loginCode=loginCode
    },
    TOKEN(state,token){
        state.token=token
    }
}
const getters={}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}