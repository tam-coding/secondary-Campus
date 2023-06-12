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