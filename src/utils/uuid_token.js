import { v4 as uuidv4 } from 'uuid';
//uuid储存在localstorage里，每次生成之前先判断里面有没有记录
export const getUUID=()=>{
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        uuid_token=uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}