<template>
    <div class="index-body">
        <el-card>
          <el-row class="tac">
            <el-col :span="3">
                <!-- @close="handleClose" @open="handleOpen" -->
                <el-menu
                @select="handleSelect"
                :default-active="index"
                class="el-menu-vertical-demo"
                background-color="#504c4c"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="height:80vh">
                <!-- <el-menu-item index="0">
                    <i class="el-icon-chat-line-round"></i>
                    <span slot="title">信息</span>
                </el-menu-item> -->
                <el-submenu index="0">
                <template slot="title">
                <i class="el-icon-chat-line-round"></i>
                <span>信息</span>
                </template>

                <el-menu-item-group >
                <el-menu-item :index="`0-${index}`" v-if="friendList" style="padding:0px 30px;min-width:0" v-for="(friend,index) in friendList" :key="friend.id">{{friend.tnickname}} <el-badge :hidden="friend.noReplyNum==0" :value="friend.noReplyNum" class="mark" style="line-height:0"/></el-menu-item>
                <!-- <el-menu-item index="0-2" style="padding:0px 50px;min-width:0;">选项2</el-menu-item> -->
                </el-menu-item-group>
               
                </el-submenu>
            </el-submenu>
                <el-menu-item index="1">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">
                            好友列表 
                    </span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-plus"></i>
                    <span slot="title"  class="clearfix">
                            好友申请 <el-badge v-if="addList.length>0" class="mark" :value="addList.length" style="line-height: 0px;" />
                    </span>
                </el-menu-item>
                </el-menu>
            </el-col>
            <!-- 申请列表-->
            <el-col :span="10" v-show="index=='2'">
                <el-card>
                    <div v-if="addList.length>0" class="add-list-each" v-for="(add,index) in addList" :key="add.id">
                        <div><el-avatar shape="square" :size="50" :src="add.icon"></el-avatar></div>
                        <span style="font-weight:bold;font-size:22px;">{{add.tnickname}}·{{add.createTime}} </span>
                        <el-button type="primary" @click="acceptFriendAdd(add)" style="margin:auto 2px">同意</el-button>
                        <!-- <div style="font-weight:bold;font-size:12px;display: flex;flex-direction: column;align-items: flex-start;"><el-avatar shape="square" :size="100" :src="add.icon"></el-avatar><span>{{add.tnickname}}·{{add.createTime}}</span></div> -->
                        
                    </div>
                    <div v-if="addList.length==0" class="add-list-each"  style="font-weight:bold;font-size:22px;">
                        暂无好友申请
                    </div>
                </el-card>

            </el-col>
            <!-- 好友列表  -->
            <el-col :span="10" v-show="index=='1'">
                <el-card>
                    <div v-if="friendList.length>0" class="add-list-each" v-for="(friend,index) in friendList" :key="friend.id">
                        <div ><el-avatar shape="square" :size="50" :src="friend.icon"></el-avatar></div>
                        <span style="font-weight:bold;font-size:22px;">{{friend.tnickname}}</span>
                        <el-button type="primary" @click="chat(friend,index)" style="margin:auto 2px">沟通</el-button></el-button>
                        <!-- <div style="font-weight:bold;font-size:12px;display: flex;flex-direction: column;align-items: flex-start;"><el-avatar shape="square" :size="100" :src="add.icon"></el-avatar><span>{{add.tnickname}}·{{add.createTime}}</span></div> -->
                    </div>
                    <div v-if="friendList.length==0" class="add-list-each"  style="font-weight:bold;font-size:22px;">
                        暂无好友
                    </div>
                </el-card>

            </el-col>

            <!-- 聊天 -->
            <el-col :span="15" v-if="index.includes('0-')">
                <el-card style="margin-left:8px">
                    <div style="font-weight:bold;font-size:22px;text-align:center">{{currentCommnicator?.tnickname}}</div>
                        <div style="border-top:1px solid #ccc"></div>
                    <div class="chatWindow" ref="chatWindow" >
                        
                        <div v-for="(message,ind) in messageList" :key="ind">
                         <!-- 右侧 消息构建 -->
                        <div class="bkbubble left" v-if="message.senderUid==currentCommnicator?.tuid">
                            <!-- 右侧消息 -->
                            <span class="bkbubble-right">
                                <div class="chat-text">{{message.message}}</div>
                            </span>
                            <span class="triangle-top-right"></span>
                            <!-- 右侧头像 -->
                            <el-avatar  class="chat-avatar" :src="currentCommnicator?.icon"></el-avatar>
                        </div>
                 
                        <!-- 左侧消息构建-->
                        <div class="bkbubble right" v-if="message.senderUid==myInfo?.uid">
                            <!-- 左侧头像 -->
                            <el-avatar class="chat-avatar" :src="myInfo?.icon"></el-avatar>
                            <!-- 左侧消息 -->
                            <span class="triangle-top-left"></span>
                            <span class="bkbubble-left" >
                                <div  class="chat-text">{{message.message}}</div>
                            </span>
                        </div>
                        </div>

                    </div>
                    <div class="inputPart" @keyup.enter="sendMessage">
                        <el-input  type="textarea" v-model="inputcontent" placeholder="" style="width:700px" rows="3" resize='none'></el-input>
                        <el-button type="info" plain style="margin-left:5px;height:50%;" @click="sendMessage" >发送</el-button>
                    </div>
                </el-card>
            </el-col>
            </el-row>  
        </el-card>
        <!-- <el-button type="info" @click="connectWebSocket">上线</el-button> -->
    <!-- <el-button type="info" @click="sendMessage">发送</el-button> -->
</div>

</template>

<script>
import {setMessage,getMessage,getAllNoReplyNum,clearNoReplyNum,increaseNoReplyNum,getNoReplyNum} from '@/utils/message'
import {getUserInfo} from '@/utils/userInfo'
import dayjs from 'dayjs'
export default {
    name:"message",
    data() {
        return {
            addList:[],//申请添加好友列表
            friendList:[],//好友列表
            index:'0-0',//0 信息 1好友列表 2申请列表
            inputcontent:'',//输入的信息
            myInfo:{},//自己的信息
            currentCommnicator:null,//当前和谁在聊天
            messageList:[],//当前和某个人的聊天记录

        }
    },
    mounted(){
        this.getAddList()
        this.getFriendList()
        // this.connectWebSocket()
        //先获取自己的信息
        this.myInfo=getUserInfo()
        // this.$set(this.myinfo,'messageList',)

        //websocket onmessage回调
        this.onmessage()
        // 获取聊天记录
        this.getMessageList()
       

        // 使用 MutationObserver 监听容器元素的变化
        //控制聊天 scroll自动到底部
        const chatContainer = this.$refs.chatWindow
        this.observer = new MutationObserver(this.handleMutation);
        this.observer.observe(chatContainer, { childList: true });

        //其它页面发起聊天时
        this.$bus.$on('chatElsePage',this.handleChatElsePage)

        
        
       
    },
    beforeDestroy() {
        // 在组件销毁前停止 MutationObserver
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    methods: {
        //获取申请添加好友列表
        async getAddList(){
            let result =await this.$API.reqGetAddList()
            if(result.code==200){
                this.addList=result.data
                this.addList.forEach(async item => {
                // 使用 Day.js 解析时间
                const specifiedDateTime = dayjs(item.createTime);;
                // 当前时间
                const currentDateTime = dayjs();
                // 计算时间差，单位为小时
                const timeDifference  = currentDateTime.diff(specifiedDateTime, 'hour');
                // 判断时间差并显示结果
                if(timeDifference<1){
                    item.createTime='1小时内'
                }
                else if (timeDifference < 24) {
                    const hoursDifference = currentDateTime.diff(specifiedDateTime, 'hour');
                    item.createTime=hoursDifference+'小时前'
                } else {
                    const daysDifference = currentDateTime.diff(specifiedDateTime, 'day');
                    item.createTime=daysDifference+'天前'
                }

                // 添加的人的信息 主要是头像
                let result =await this.$API.reqAddRequesterInfo(item.tuid)
                if(result.code==200){
                    this.$set(item,'icon',result.data.icon)
                }
                });
            }
        },
        // 同意好友申请
        async acceptFriendAdd(add){
            let result=await this.$API.reqAgreeFriend(add.tuid)
            if(result.code==200){
                this.addList=[]
                this.$message({type:'success',message:'已成为好友'})
            }
        },
        //获取好友列表
        async getFriendList(){
            let result =await this.$API.reqGetFriendList()
            if(result.code==200){
                this.friendList=result.data
                this.friendList.forEach(async item => {
                //添加待回复数量的属性
                
                this.$set(item,'noReplyNum',getNoReplyNum(this.myInfo.uid,item.tuid))
                // 获取好友的头像
                let result =await this.$API.reqAddRequesterInfo(item.tuid)
                if(result.code==200){
                    this.$set(item,'icon',result.data.icon.includes("null")?'':result.data.icon)
                }
                });
                //让好友第一个默认当前的聊天对象
                if(this.friendList.length>0){
                 this.currentCommnicator=this.friendList[0]
                 this.getMessageList()
                 //因为挂载默认到第一个好友的聊天页面，所有需要清除第一个好友的查看标记
                 this.clearFirstNoReplyNum()
                }
            }
        },
        //菜单选中变化 的回调
        handleSelect(index){
           
            this.index=index
      
             //获取当前和哪个用户聊天
            const [a,b]=this.index.split('-')
            const currentCommnicator=this.friendList[b]
            this.currentCommnicator=currentCommnicator

             // 获取聊天记录 0说明点击的信息下的选项
             if(a==0){
            this.getMessageList()
            //点击该消息了以后把没回复标记清除
            clearNoReplyNum(this.myInfo.uid,this.friendList[b].tuid)
             this.friendList[b].noReplyNum=0
             }
            if(index=='1'){
                this.getFriendList()
            }else if(index=='2'){
                this.getAddList()
            }    
        },
        //发起聊天
        chat(friend,index){
            this.handleSelect(`0-${index}`)
            // const token=getToken()
            // this.socket= new WebSocket(`ws://localhost:8080/websocket/chat?token=${token}`);
        },
        //发送消息
        sendMessage() {
            // tid：对方的uid 即是tuid
            // message：发给对方的消息
            const tid=this.currentCommnicator.tuid
            //保持发送的message
            //输入框输入的内容
            const message=this.inputcontent
            this.sendMsg = {tid,message}
            console.log(`向${this.currentCommnicator.tuid}发送了`+message);
            setMessage(this.myInfo.uid,this.currentCommnicator.tuid,{senderUid:this.myInfo.uid,message:this.inputcontent})
            console.log('我在send中去 存储发送的内容了');
            //更新聊天记录 
            this.getMessageList()
            this.inputcontent=''
            this.$bus.socket.send(JSON.stringify(this.sendMsg));
        },
        
        onmessage(){
          this.$bus.socket.onmessage= (event) => {
             const [otherUid, message] = event.data.split(",");
             if(message!="对方当前不在线，您的消息将暂时保留"){
                if(otherUid!=this.currentCommnicator.tuid){
                    const index=this.friendList.findIndex(item=>item.tuid==otherUid)
                    increaseNoReplyNum(this.myInfo.uid,this.friendList[index].tuid)
                    this.friendList[index].noReplyNum=getNoReplyNum(this.myInfo.uid,this.friendList[index].tuid)
                }
                setMessage(this.myInfo.uid,otherUid,{senderUid:otherUid,message:message})
                this.getMessageList()
                console.log('我是message中的onmessage 我收到信息 并去保持',event.data);
             }

           
          }
        },
        //获取消息记录
        getMessageList(){
           this.messageList= getMessage(this.myInfo.uid,this.currentCommnicator?.tuid)
        },
        //控制聊天 scroll自动到底部
        scrollToBottom() {
            const chatContainer = this.$refs.chatWindow
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        handleMutation() {
            // 在容器变化时调整滚动位置
            this.scrollToBottom();
        },
        //其它页面发起聊天的回调
        handleChatElsePage(uid){
            const index=this.friendList.findIndex(item=>{
                item.tuid==uid
            })
            this.handleSelect(`0-${index}`)
        },
        clearFirstNoReplyNum(){
            clearNoReplyNum(this.myInfo.uid,this.friendList[0].tuid)
             this.friendList[0].noReplyNum=0
        }
     

    }
}
</script>

<style>

   .index-body{
    padding-top:80px;
    width: 80%;
    margin: 0 auto;
  }
  .add-list-each{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid #d1d0d0;
    padding: 3px;
    border-radius: 10px;
  }


.triangle-top-left {
	width: 5px;
	height: 5px;
	border-top: 15px solid #EEEEEE;
	border-left: 15px solid transparent;
	margin-top: 10px;
	margin-left: 5px;
}
.triangle-top-right {
      width: 5px;
      height: 5px;
      border-top: 15px solid #FED3BD;
      border-right: 15px solid transparent;
      margin-top: 10px;
      margin-right: 5px;
}
.bkbubble.right div:before, .bkbubble.left div:before {
    border-style: solid;
    margin-top: 5px;
}

.bkbubble {
    margin: 15px 0px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: top;
    align-items: top;
}

.bkbubble.left {
	-webkit-justify-content: right;
	justify-content: right;
}

.bkbubble .bkbubble-left {
    padding: 10px;
    border-radius: 5px;
    background-color: #EEEEEE;
}

.bkbubble-right {
    padding: 10px;
    background-color: #FED3BD;
    border-radius: 5px;
}

.bkbubble.right {
    margin-left: 10px;
    /* border-width: */
}

.bkbubble.left {
    margin-right: 5px;
    border-width: 0 0 12px 12px ;
}

.chat-image{
    width: 150px;
    height: 150px;
}
.chat-avatar {
	width: 40px; 
	height: 40px;
}
.chat-text {
	max-width: 400px;
}
.inputPart{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        margin: 0px 0px 0px 5px;
        min-width: 0px;
        border-radius: 4px;
        /* border: 1px solid rgb(235, 235, 235); */
    }
    .chatWindow{
        min-height: 65vh;
        max-height: 65vh;
        overflow: scroll;
        overflow-y: auto; /* 垂直方向出现滚动条 */
        overflow-x: hidden;
    }
    .el-menu-item-group__title{
        box-sizing: border-box;
        width: 0px;
        height: 0px;
        padding: 0;
    }
</style>