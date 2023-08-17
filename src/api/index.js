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

//获取商品分类列表by goodsSortId
export const reqGetListBySortId=(goodsSortId)=>requests({url:`/web/goods/goodsSort/${goodsSortId}`,method:"get"})

//获取论坛post列表
export const reqGetPostList=(data)=>requests({url:`/web/post/page`,data,method:"post"})

//获取post详细by id
export const reqGetPostDetailbyId=(id)=>requests({url:`/web/post/${id}`,method:"get"})

//获取顶层评论
export const reqGetTopComment=(pageDto)=>requests({url:`/web/postController/getTopComment`,data:pageDto,method:"post"})

//获取子评论
export const reqGetSubComment=(pageDto)=>requests({url:`/web/postController/getCommentByParent`,data:pageDto,method:"post"})

//发布顶层评论
export const reqPostTopComment=(postComment)=>requests({url:`/web/postController/addCommentWithPost`,data:postComment,method:"post"})

//发布子评论
export const reqPostSubComment=(postComment)=>requests({url:`/web/postController/addCommentWithParent`,data:postComment,method:"post"})

//检查是否点赞
export const reqCheckLike=(postId)=>requests({url:`/web/postLike/check/${postId}`,method:"get"})

//设置点赞
export const reqSetLike=(postId)=>requests({url:`/web/postLike/${postId}`,method:"get"})

//添加post
export const reqAddPost=(postReq)=>requests({url:`/web/post/save`,data:postReq,method:"post"})

//检查是否是好友了
export const reqCheckFriend=(tid)=>requests({url:`/web/user-friend/check/${tid}`,method:"get"})

//申请添加好友
export const reqAddFriend=(tid)=>requests({url:`/web/user-friend/add/${tid}`,method:"get"})

//获取添加请求列表
export const reqGetAddList=()=>requests({url:`/web/user-friend/getAddList`,method:"get"})

//同意好友请求
export const reqAgreeFriend=(tid)=>requests({url:`/web/user-friend/agree/${tid}`,method:"get"})

//获取添加的人的信息
export const reqAddRequesterInfo=(id)=>requests({url:`/web/user/uid/${id}`,method:"get"})

//获取好友列表
export const reqGetFriendList=()=>requests({url:`/web/user-friend/getUserFriendList`,method:"get"})
