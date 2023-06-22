import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
import { getUUID } from '@/utils/uuid_token';
const state={
   goodInfo:{},
   //游客临时身份
   uuid_token:getUUID(),
};

const actions={
    async getGoodInfo({commit},skuid){
        let result=await reqGoodsInfo(skuid)
        if(result.code==200){
            commit('GOODINFO',result.data)
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //将数据带给服务器
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('failed'))
        }
       
    }
};
const mutations={
    GOODINFO(state,goodInfo){
        state.goodInfo=goodInfo||{}
    }
};

const getters={
    //路径导航
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //产品信息
    categoryView(state){
        return state.goodInfo.categoryView||[]

    },
    //产品售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||{}

    },
};

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}