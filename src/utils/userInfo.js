
export const setUserInfo=(userInfo)=>{
    localStorage.setItem("userInfo",JSON.stringify(userInfo))
 }
 export const getUserInfo=()=>{
    return JSON.parse(localStorage.getItem("userInfo"))
 }
 export const removeUserInfo=()=>{
    localStorage.removeItem("userInfo")
 }