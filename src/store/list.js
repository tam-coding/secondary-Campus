import {reqAllList,reqAddGood} from '@/api'

const state={
    allList:{}
}
const actions={
    //获取正在出售的商品列表
    async getAllList({commit}){
        let result=await reqAllList()
        if(result.code==200){
            commit("GETALLLIST",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("failed"))
        }
    },
    //上传商品
    async reqAddGood({commit}){
        let result=await reqAddGood(data)
        if(result.code==200){
            return '上传成功'
        }else{
            return Promise.reject(new Error('上传失败'))
        }
    }
    
}
const mutations={
    GETALLLIST(state,allList){
        state.allList=allList
    }
}
const getters={

}


export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}