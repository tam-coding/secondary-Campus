import requests from "./ajax";
import mockRequest from "./mockAjax";

//三级联动接口
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'GET'})

//banner
export const reqGetBannerList=()=>mockRequest.get('/banner')

//floor
export const reqGetFloorList=()=>mockRequest.get('/floor')

//search模块
export const reqGetSearchInfo=(params)=>requests({url:"/list",data:params,method:"post"})

//商品详细信息
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:"get"})

//添加到购物车(对已有物品进行数量改动)
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"})

//购物车列表
export const reqCarList=()=>requests({url:'/cart/cartList',method:'get'})

//删除购物车
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改购物车选中状态
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})