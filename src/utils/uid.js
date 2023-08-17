//uid储存在localstorage里，每次生成之前先判断里面有没有记录
//使用手机号作为uid了
export const getUID=()=>{
    let uid=localStorage.getItem('UID')
    if(!uid){
        // 获取当前时间戳
        const timestamp = Date.now().toString().slice(3,12);
        


        // 将时间戳和随机数组合起来
         uid = parseInt(timestamp);
        
        localStorage.setItem('UID',uid)
    }
    return uid
}