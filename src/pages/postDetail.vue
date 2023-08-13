<template>
  <div class="index-body">
    <div class="top-box">
        <el-card style="width:995px">
            <h2 slot="header" style="font-size:25px">{{postDetail.title}}</h2>
            <div class="top">
                <div class="userInfo">
                    <div >{{postDetail.content}}</div>
                    <div style="height:200px;width:100%">
                        <img v-for="item in postDetail.postImageList" :key="item.id" :src="item.image" style="width:175px;margin:2px 8px">
                    </div>
                </div>
            </div>
        </el-card>
        <div class="userInfo" style="padding-left:5px">
            <el-card>
                <div class="block">
                    <el-avatar shape="square" :size="150" :src="postDetail.webUserDto?.icon"></el-avatar>
                    <div style="font-weight:bold;fonst-size:18px;text-align:center;margin-top:10px">发布人:{{postDetail.webUserDto?.username}}</div>
                </div>
            </el-card>
    </div>
    </div>

    <el-card style="margin-top:30px;font-weight:bold;font-size:18px;width:995px">
        <div slot="header">回复</div>
             <el-button type="primary" icon="el-icon-edit" v-if="isShowTopInputComment" @click="isShowTopInputComment=!isShowTopInputComment">添加评论</el-button>
            <div class="inputPart" v-else >
                <el-input type="textarea" v-model="inputComment" placeholder="请输入评论" style="width:700px" rows="3" ></el-input>
                <el-button type="info" plain style="margin-left:5px;height:50%;" @click="postTopComment()">发布</el-button>
                <el-button type="info" plain style="margin-left:5px;height:50%;" @click="isShowTopInputComment=!isShowTopInputComment">取消</el-button>
            </div>
        <div class="top-comment" v-for="(comment,index) in topComment.pageList " :key="comment.id">
              <div>
                <el-avatar shape="square" :size="50" :src="comment.userDto?.icon" style="width:50px"></el-avatar>
              </div>
              <div class="top-comment-content">
                <span style="font-weight:normal;font-size:10px">{{comment.userDto.username}} · {{hourPass[index]}}</span>
                <div style="font-size:15px">{{comment.content}}</div>
                <el-button v-if="!comment.isShowSubComment" style="font-size:14px;width:882px;height:20px;padding:2px;margin:10px auto 0px auto" @click="showSubComment(comment)">展开评论<i class="el-icon-caret-bottom"></i></el-button> 
                
                <!-- 子评论 -->
                
                <!-- 评论输入框 -->
                <div class="inputPart" v-show="comment.isShowSubComment" >
                    <el-input type="textarea" v-model="comment.InputSubComment" placeholder="请输入评论" style="width:700px" rows="3" ></el-input>
                      <el-button type="info" plain style="margin-left:5px;height:50%;" @click="postSubComment(comment)">发布</el-button>
                </div>
                <div class="sub-comment-all" v-for="(sComment,index) in comment.subComment?.pageList" :key="sComment.id">
                <el-collapse-transition>
                    <div v-show="comment.isShowSubComment" >
                        <el-card style="width:875px" >
                            <div class="sub-comment-each">
                                <div>
                                    <el-avatar shape="square" :size="50" :src="sComment.userDto?.icon" style="width:50px"></el-avatar>
                                </div>
                                <div class="sub-comment-content">
                                    <span style="font-weight:normal;font-size:10px">{{sComment.userDto.username}} · {{sComment.createTime}}</span>
                                    <div style="font-size:15px">{{sComment.content}}</div>
                                </div>
                            </div>

                        </el-card>

                    </div>

                </el-collapse-transition>
              </div>
                <el-button v-if="comment.isShowSubComment" style="font-size:14px;width:882px;height:20px;padding:2px;margin:10px auto 0px auto" @click="closeSubComment(comment)">折叠评论<i class="el-icon-caret-top"></i></el-button> 
              </div>
        </div>
            
        
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name:'postDetail',
    data() {
        return {
            postDetail:{},//post详细
            topComment:{},//顶层评论
            inputComment:'',//用户输入的顶层评论
            isShowTopInputComment:true,//顶层评论输入框显示隐藏
        }
    },
    created(){
        
        this.getPostDetail()
        this.getTopComment()
    },
    computed:{
        //顶层评论的时间差
        hourPass(){
            if(this.topComment.pageList){
                 var hourPassList= this.topComment.pageList.map(item=>{
                // 使用 Day.js 解析时间
                const specifiedDateTime = dayjs(item.createTime);;
                // 当前时间
                const currentDateTime = dayjs();
                // 计算时间差，单位为小时
                const timeDifference  = currentDateTime.diff(specifiedDateTime, 'hour');
                // 判断时间差并显示结果
                if(timeDifference<1){
                    return '1小时内'
                }
                else if (timeDifference < 24) {
                    const hoursDifference = currentDateTime.diff(specifiedDateTime, 'hour');
                    return hoursDifference+'小时前'
                } else {
                    const daysDifference = currentDateTime.diff(specifiedDateTime, 'day');
                    return daysDifference+'天前'
                }
            })
            }
         
            return hourPassList
        }
    },
    methods:{
        // 获取post的详细
        async getPostDetail(){
            const postid=this.$route.params.postid
            let result =await this.$API.reqGetPostDetailbyId(postid)
            if(result.code==200){
                this.postDetail=result.data
                this.postDetail.webUserDto.icon='http://localhost/visitor/file/download/'+this.postDetail.webUserDto.icon
            }
        },
        //获取顶层评论
        async getTopComment(){
            let result=await this.$API.reqGetTopComment({current:1,size:9999,id:this.$route.params.postid})
            console.log(result);
            if(result.code==200){
                this.topComment=result.data
                this.topComment.pageList.forEach(item => {
                    this.$set(item,'isShowSubComment',false)
                    this.$set(item,'InputSubComment','')
                    item.userDto.icon='http://localhost/visitor/file/download/'+item.userDto.icon
                });
                
                
            }
        },
        //获取子评论
        async showSubComment(comment){
            comment.isShowSubComment=!comment.isShowSubComment
            let result=await this.$API.reqGetSubComment({current: 1, size: 9999, id: comment.id})
            if(result.code==200){
                const subComment=result.data
                subComment.pageList.forEach(item => {
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
                    item.userDto.icon='http://localhost/visitor/file/download/'+item.userDto.icon
                });
                this.$set(comment,'subComment',subComment)
                
            }
        },
        //关闭子评论
        closeSubComment(comment){
            comment.isShowSubComment=!comment.isShowSubComment
        },
        //发布顶层评论
        async postTopComment(){
            let result =await this.$API.reqPostTopComment({postId:this.postDetail.id, content: this.inputComment})
            console.log(result);
            this.inputComment=''
            this.getTopComment()
        },
        //发布子评论
        async postSubComment(comment){
            
            let result=await this.$API.reqPostSubComment({ postId:this.postDetail.id,content:comment.InputSubComment, parentId:comment.id})
            console.log(result);
            comment.InputSubComment=''
            this.showSubComment(comment)
            comment.isShowSubComment=!comment.isShowSubComment
        }
    }
}
</script>

<style scoped>
.index-body{
    padding-top:80px ;
    width: 80%;
    margin: 0 auto;
  }
  .top-box{
    display: flex;
    justify-content: space-between;
  }
  .top{
    display: flex;
    justify-content: space-between;
  }
  .userInfo{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .top-comment{
    display: flex;
    justify-content: flex-start;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    border: 2px solid #e4e0e0;
    padding:8px 3px;
    margin: 15px auto;
  }
  .top-comment-content{
    margin-left:13px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .sub-comment-all{
    padding:2px 3px;
    margin-top: 1px;
    margin-left:3px
  }
  .sub-comment-each{
    display: flex;
    justify-content: flex-start;
  }
  .sub-comment-content{
    margin-left:13px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

</style>