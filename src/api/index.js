import requests from "./ajax";
import mockRequest from "./mockAjax";

//获取登录验证码
export const reqLoginCode=(phone)=>requests({url:`/auth/login/code/phone/${phone}`,method:"get"})

//密码登录
export const reqPasswordLogin=(data)=>requests({url:`/auth/login/phone/password`,data,method:"post"})

//验证码登录&&注册
export const reqCodeLogin=(data)=>requests({url:`/auth/login/phone/code`,data,method:"post"})
