<template>
  <div class="index-header">
<!--    顶栏-->
    <nav class="navbar index-header-bar">
      <el-row>
        <el-col :span="3" :offset="3">
          <span>校园二手交易平台</span>
        </el-col>
        <el-col :span="10" :offset="5">
          <el-row>
            <el-col :span="3" :offset="1" class="index-header-bar-span">
              <a href="/"><i class="el-icon-bicycle"></i> 首页</a>
            </el-col>



            <el-col v-if="!isLogin"  :span="3" :offset="1" class="index-header-bar-span">
              <a href="#" >登录/注册</a>
              <ul class="dropdown-menu my-dropdown-menu-1">
                <li>
<!--                  <a href="#" class="my-dropdown-menu-li-1">登录</a>-->
                  <!-- <a class="my-dropdown-menu-li-1" @click="checkLogin1">登录</a> -->
                  <router-link class="my-dropdown-menu-li-1" to="/login"> 登录</router-link>
                </li>
                <li>
<!--                  <a href="#" class="my-dropdown-menu-li-1">注册</a>-->
                  <!-- <a class="my-dropdown-menu-li-1" @click="checkLogin2">注册</a> -->
                  <router-link class="my-dropdown-menu-li-1" to="/register">注册</router-link>
                </li>
              </ul>
            </el-col>
            
            <el-col v-else :span="3" :offset="1" class="index-header-bar-span">
             <a class="my-dropdown-menu-li-1" @click="logout"><i class="el-icon-unlock"></i> 退出登录</a>
             
            </el-col>
            


            <el-col :span="3" :offset="1" class="index-header-bar-span">
              <!-- <img src="../assets/shopcar.png" alt="" style="width: 20px;"> -->
              <a href="#" @click="clickMessage"><el-badge :is-dot="isdot" class="item" style="vertical-align:middle"><i class="el-icon-message-solid"></i> 消息</el-badge></a>
            </el-col>
            <el-col :span="3" :offset="1" class="index-header-bar-span">
                <router-link to="/addGoods"><i class="el-icon-orange"></i> 上架闲置</router-link>
            </el-col>
            <el-col :span="3" :offset="1" class="index-header-bar-span">
              <a href="#"  @click="showUserInfo"  > <i class="el-icon-user-solid"></i>  个人信息</a>
              <!-- <ul class="dropdown-menu my-dropdown-menu-1" >
                <li>
                  <a class="my-dropdown-menu-li-1"  @click="showUserInfo" > </a>
                </li>
                <li>
                  <a class="my-dropdown-menu-li-1" >已购订单</a>
                </li>
                <li>
                  <a class="my-dropdown-menu-li-1" >个人闲置</a>
                </li>
              </ul> -->
            </el-col>

            
          </el-row>
        </el-col>
      </el-row>
    </nav>
<!--    顶栏结束-->

        
      <!-- 个人信息抽屉 :before-close="handleClose" destroy-on-close -->
      <el-drawer
        :with-header="false"
        :visible.sync="drawer"
        size="50%"
        @open="handleDrawerOpen"
       
        >
        <div class="drawer-container">

        </div>
        <h2 style="font-weight:bold;font-size:25px;padding-left:20px">个人信息:</h2>
        <el-card style="margin-top:20px">
          <div style="text-align:center">
          
           
            <div style="margin-top:20px">
              <el-form ref="form" :model="userInfo" label-width="80px">
                <el-row :gutter="10">
                  <el-col :span="24">
 <!--  -->
                    <el-upload
                      class="avatar-uploader"
                      action="/web/file/upload"
                      :show-file-list="false"
                      :headers="headers"
                      :data="uploadData"
                      :on-success="handleAvatarSuccess"
                      :before-upload="handleBeforeUpload"
                    >
                      <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-col>
                </el-row>
                <el-row :gutter="10" style="margin-top:50px">
                  <el-col :span="6" >
                    <el-form-item label="用户名:"  style="margin-left:160px">
                      <el-input v-if="userInfo" v-model="userInfo.username" style="width:250px" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="手机号:"  style="margin-left:160px">
                      <el-input v-model="userInfo.phone"  style="width:250px" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                 <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="密码 :"  style="margin-left:160px">
                      <el-input v-model="password" type="password" style="width:250px" placeholder="不填则为不修改"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-form-item label="邮   箱 :"  style="margin-left:160px">
                      <el-input v-model="userInfo.email"  style="width:250px" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
               
                <el-row>
                  <el-col :span="6" style="margin-left:260px">
                    <el-button type="primary" @click="saveUserInfo">保存</el-button>
                  </el-col>
                </el-row>
              </el-form>
             
            </div>
            
          </div>
        </el-card>
      </el-drawer>
  </div>
</template>

<script>
    //import { mapGetters } from 'vuex'
    import {getToken,removeToken} from '@/utils/token'
    import {getUserInfo,removeUserInfo} from '@/utils/userInfo'
    import {setMessage,getMessage,increaseNoReplyNum} from '@/utils/message'
    
    export default {
      name: "Header",
      data(){
        return{
          headers:{}, //上传头像携带token
          isLogin:false, //是否已经登录
          userInfo:{ }, //用户信息
          drawer:false, //抽屉显示隐藏
          password:"",
          uploadData:{fileUseId:null}, //上传头像携带参数
          avatarUrl:'', //用户头像的url
           socket: null,//websoket对象
           isdotAdd:false,//控制header的消息小红点 有没有好友添加的消息
           isdotMassage:false,//控制header的消息小红点 有没有消息
       
        }
      },
      created(){
        this.$bus.$on('isLogin',(isLogin)=>{
          console.log("我登陆啦！");
          this.isLogin=isLogin
          
      })
      },
    mounted(){
      this.isLogin=getToken()?true:false
      this.connectWebSocket()
       this.getAddList()
       this.userInfo=getUserInfo()
      
       
    },
    computed:{
      isdot(){
        console.log('isdot变化');
        return this.isdotAdd||this.isdotMassage
      }
    },
 
    methods:{
      logout(){
        removeToken()
        removeUserInfo()
        this.isLogin=false
        this.userInfo={}
        this.$router.replace('/login')
        this.$message({message:'已退出登录！', offset:50,duration:1000})
      },
      // 显示抽屉
      showUserInfo(){
        this.drawer=true
      },
      // 上传头像成功回调
      handleAvatarSuccess(response, file, fileList){
        console.log("上传头像成功回调");
        console.log(response);
        // 'http://xiaozaiz.xyz/visitor/file/download/'
        this.avatarUrl='http://localhost/visitor/file/download/'+response.data.minPath+response.data.minName
      },
      //上传图片之前获取file的id
      async handleBeforeUpload(file){
        let result=await this.$API.reqGetFileId('头像')
        console.log('获取fileId');
        if(result.code==200){ 
            this.uploadData.fileUseId=result.data.id
    
        }
      },
      //保存用户信息
      async saveUserInfo(){
        
        const username=this.userInfo.username
        const lastIndex=this.avatarUrl.lastIndexOf("download/")
        const icon = this.avatarUrl.substring(lastIndex + "download/".length);
        console.log(icon);
        const userDTO={username,icon}
        if(this.password){
          userDTO.password=this.password
        }
        let result = await this.$API.reqUpdateUserInfo(userDTO)
        console.log(result);
        if(result.code==200){
          this.drawer=false
          this.$message({message:"保存成功,请重新登录",type:"success",offset:15})
          this.avatarUrl=''
          this.headers.Authorization=''
          removeUserInfo()
          
          this.logout()
        }
      },
      handleDrawerOpen(){
        
        this.userInfo=getUserInfo()
        //如果用户信息中头像路径不为http://xiaozaiz.xyz/visitor/file/download/null才要
        this.avatarUrl=this.userInfo.icon.includes("null")?"":this.userInfo.icon
        if(this.isLogin){
        this.headers={
          Authorization:getToken()
        }
      
     }
      },
       connectWebSocket() {
            const token=getToken()
            // 创建WebSocket连接

            // 不要 8080 ，直接使用服务器端口 80
            this.socket = new WebSocket(`ws://localhost/websocket/chat?token=${token}`);
            //暴露全局soket
            this.$bus.socket=this.socket 
            // 在连接打开时触发的事件
            this.socket.onopen = () => { console.log("Connected to server"); };


            // 在接收到消息时触发的事件
            this.socket.onmessage = (event) => {
                // 对方发过来的消息
                // const message = event.data;
                // console.log("我是header中的onmessage");
                // console.log(message)
                // uid：对方的 uid
                // msg：对方的消息
                // 下面是对方不在线返回的消息，同样是使用逗号分隔uid和msg
                // 1234,对方当前不在线，您的消息将暂时保留
                // const [uid, msg] = message.split(",");
                // console.log(uid)
                // console.log(msg)
                 const [otherUid, message] = event.data.split(",");
                 if(message!="对方当前不在线，您的消息将暂时保留"){
                    setMessage(this.userInfo.uid,otherUid,{senderUid:otherUid,message:message})
                    increaseNoReplyNum(this.userInfo.uid,otherUid)
                    console.log('我是header中的onmessage,我要去储存'+message);
                    this.isdotMassage=true
                 }

            };
            //连接关闭的时触发的事件
            this.socket.onclose=(event)=>{
              console.log('websocket 关闭了');
              console.log(event.data);
            }
        },
        //获取申请添加好友列表
        async getAddList(){
            let result =await this.$API.reqGetAddList()
            console.log(result);
            if(result.code==200&&result.data.length>0){
                this.isdotAdd=result.data.length>0?true:false
            }
        },
        //点击消息事件回调
        clickMessage(){
          this.isdotMassage=false
          this.$router.push('/message')
        }
        
    }

    }
</script>

<style >

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon  {
    font-size: 28px !important; 
    color: #8c939d !important; 
    width: 178px !important;
    height: 178px !important;
    line-height: 178px !important;
    text-align: center !important;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .drawer-container{
    width: 80%;
    margin: 0 auto;
    padding-top: 80px;
   
  }
  .index-header-bar{
    margin-top: 0;
    border-radius: 0;
    line-height: 36px;
    background-color: rgb(140,34,44);
    position:fixed;
    width: 100%;
    z-index: 999;
  }
  .navbar{
    height: 36px;
    min-height: 0;
  }
  .index-header-bar span{
    color: #e2c8ca;
    font-size: 12px;
    line-height: 34px;
  }
  .index-header-bar span:hover{
    color: white;
  }
  .index-header-bar-span{
    color: #e2c8ca;
    font-size: 12px;
    text-align: center;
    line-height: 34px;
    position: relative;
  }
  .index-header-bar-span:hover{
    background-color: rgb(123,17,27);
  }
  .index-header-bar a{
    color: #e2c8ca;
    font-size: 12px;
    line-height: 34px;
    text-decoration: none;
    border: 0;
  }
  .index-header-bar a:hover{
    color: white;
  }
  .my-dropdown-menu-1{
    background-color: rgb(140,34,44);
    text-align: center;
    min-width: 80px;
    display: none;
    position: absolute;
  }
  .my-dropdown-menu-li-1:hover{
    cursor: pointer;
    background-color: rgb(123,17,27);
  }
   .index-header-bar-span:hover .my-dropdown-menu-1{
    display: block;
   }
  .my-el-menu-1{
    border-bottom: 0;
  }
  .my-el-menu-1>.el-menu-item.is-active{
    border-bottom: 2px solid rgb(181,170,154);
  }
  .my-el-menu-item-1{
    margin-left: 5%;
    line-height: 50px;
    height: 50px;
  }
</style>
