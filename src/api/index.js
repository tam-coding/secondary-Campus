import requests from "./ajax";
import mockRequest from "./mockAjax";

//获取登录验证码
export const reqCode=(phone)=>requests({url:`/auth/login/code/phone/${phone}`,method:"get"})

//密码登录
export const reqLoginByPassword=(data)=>requests({url:`/auth/login/phone/password/getUserDto`,data,method:"post"})

//验证码登录&&注册
export const reqLoginByCode=(data)=>requests({url:`/auth/login/phone/code`,data,method:"post"})

//获取商品列表
export const reqAllList=(data)=>requests({url:`/web/goods/page`,data,method:"post"})

//上传商品
export const reqAddGood=(data)=>requests({url:`/web/goods/save`,data,method:"post"})

//获取fileId
export const reqGetFileId=(fileUseName)=>requests({url:`/web/fileUser/getIdByName/${fileUseName}`,method:"get"})

//获取fileId
export const reqUpdateUserInfo=(userInfo)=>requests({url:`/web/user/update`,data:userInfo,method:"post"})

//添加商品 
export const reqSaveGoodsInfo=(goodsInfo)=>requests({url:`/web/goods/save`,data:goodsInfo,method:"post"})

//获取商品分类列表
export const reqGoodsSortList=()=>requests({url:`/web/goodsSort/list`,method:"get"})

//获取商品分类列表
export const reqGetListBySortId=(goodsSortId)=>requests({url:`/web/goods/goodsSort/${goodsSortId}`,method:"get"})
