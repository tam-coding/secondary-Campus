import {reqCarList,reqDeleteCartById,reqUpdateCheckedById} from '@/api/index'
const state={
    cartList:[]
}
const actions={
    async getCartList({commit}){
        let result=await reqCarList()
        if(result.code==200){
            commit("GETCARTLIST",result.data)
        }
    },
    async deleteCartById({commit},skuid){
        let result=await reqDeleteCartById(skuid)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //修改选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result =await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //删除使用选中的购物车商品
    deleteAllCheckedCart({dispatch,getters}){
        //储存每次删除返回的promise
        let promises=[]
        getters.cartList.cartInfoList.forEach(item => {
            let promise =item.isChecked==1?dispatch("deleteCartById",item.skuId):""
            promises.push(promise)
        });
        return Promise.all(promises)
        
        
    },
    //修改全部商品选中状态
    updateAllCartChecked({dispatch,state},isChecked){
    
        let promises=[]
        state.cartList[0].cartInfoList.forEach(item => {
            let promise =dispatch("updateCheckedById",{skuId:item.skuId,isChecked})
           
            promises.push(promise)
        });
        return Promise.all(promises)
        
        
    },

}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const getters={
    cartList(){
        return state.cartList[0]||{}
    },
    
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}