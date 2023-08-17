<template>
  <div class="index-body">
    <!-- 所有商品  slot="header" class="clearfix"-->
    <p class="index-body-p-1" ><span style="background-color: #ff9900;padding:5px 5px 2px 5px;border-radius:8px;margin-left:3px;margin-bottom:8px">闲置</span> :</p>
   <!-- <div style="border-top: 3px solid #ccc;"></div> -->
  <!-- <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:25px;margin-top:20px">
    <el-tab-pane :label="goodsSort.name" :name="goodsSort.name" v-for="(goodsSort,index) in goodsSortList" :key="goodsSort.id"></el-tab-pane>

  </el-tabs> -->
  <el-card style="margin-top:20px">
    
<el-row :gutter="50"  style="padding-top:30px;margin:0 auto">

  <el-col :span="8" v-for="(page,index) in pageList" :key="page.id" >
    <el-card :body-style="{ padding: '0px', marginBottom: '75px', maxHeight:'300px'}"     >
      
          <img v-if="page.goodsImagesList[0]" :src="page.goodsImagesList[0].image"  style="width:100%;height:250px;margin: 0 auto;display: block;margin-top:3px" class="image multi-content" />
           <img v-else src="../assets/noFound.jpg"  style="width:100%;height:250px;margin: 0 auto;display: block;margin-top:3px" class="image multi-content" />
          <div style="padding: 14px;">
            <div >
              <span style=" font-weight:bold; font-size:20px">{{ page.name }}</span >
              <span style=" font-weight:bold;font-size:15px;color: #00000080; ">￥{{page.price}}</span>
            </div>
            <div style=" font-weight:bold;height:40px;word-wrap: break-word;overflow: auto">{{ page.description }}</div>
            <div class="bottom card-header" style="color: #00000080; ">
              
              
             <div style="display: flex;align-items: center;justify-content: space-between">
              <div style="display: flex;align-items: center">
              <span @click="showOtherInfo(page.webUserDto)" style="cursor:pointer"><el-avatar :src="page.webUserDto.icon" size="small"></el-avatar></span>
              <span  style="color: #00000080; font-size:16px;cursor:pointer" @click="showOtherInfo(page.webUserDto)">{{page.webUserDto.username}}</span>
              </div>
             
              <el-button type="text" class="button" style="padding:0" @click="showDetail(page)">查看详细</el-button>

             </div>
               
    
            </div>
          </div>
    </el-card>
  </el-col>
</el-row>







<!-- dialog  商品详细-->
<el-dialog
  top="1vh"
  :title="detailList.name"
  :visible.sync="dialogVisible"
  width="40%"
  center
  v-if="Object.keys(this.detailList).length > 0"
  >
<span  class="dialog-body">     
   <el-row >
        <el-col :span="24">
          <el-card :body-style="{ padding: '0px' }">
            <!-- 走马灯 -->
              <el-carousel :interval="5000" arrow="hover" height="500px">
                <el-carousel-item v-for="(item,index) in detailList.goodsImagesList" :key="item.fileId">
                  
                  <img :src="item.image" class="image" style="width:100%;height:500px">

                </el-carousel-item>
              </el-carousel>

            <div style="padding: 14px;">
              <div style=" font-weight:bold;height:40px;word-wrap: break-word;overflow: auto">{{detailList.description}}</div>
              <div>{{detailList.createTime.split('T')[0]}}</div>
              <div class="bottom clearfix">
               
                <el-col style="text-align:center">
                  <el-button type="primary"  @click="showOtherInfo(detailList.webUserDto)" >查看卖家</el-button>
                </el-col>
                
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
</span>

 
 
</el-dialog>

<!-- otherInfo-dialog :before-close="handleClose"-->
<el-dialog
 
  :visible.sync="dialogVisible1"
  width="30%"
  >
   <div class="block" style="text-align:center"><el-avatar :size="150" :src="otherUserInfo.icon"></el-avatar></div>
  <div style="text-align:center;font-weight:bold;font-size:30px;margin-top:10px">{{otherUserInfo.username}}</div>
  <div style="margin-top:40px;text-align:center" v-if="contractOrAdd==0"><el-button type="primary" @click="contract(otherUserInfo.uid)" style="width: 60%;">联系同学</el-button></div>
  <div style="margin-top:40px;text-align:center" v-else-if="contractOrAdd==1"><el-button type="primary" @click="addFriend(otherUserInfo.uid)" style="width: 60%;">添加同学</el-button></div>
  <div style="margin-top:40px;text-align:center" v-else>这是自己哦！</el-button></div>
  

</el-dialog>

  </el-card>
<!-- pagination @size-change="handleSizeChange"-->
<el-pagination
  background
  :page-size="limit"
  @current-change="handleCurrentChange"
  :current-page="page"
  style="text-align:center;margin-top:20px"
  layout="prev, pager, next, total,jumper"
  :total="total">
</el-pagination>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
    name:'List',
    data() {
        return {
             dialogVisible: false,//商品详细的dialog
             dialogVisible1:false,//其他人信息的dialog
             detailList:{}, //商品信息page
             page:1,//当前页
             limit:3,//每页多少条数据
             total:0,//总页数
             pageList:[], //商品数据列表
             otherUserInfo:{},//其它人的信息
             contractOrAdd:1,//0 显示联系按钮 1显示添加按钮 2自己 不显示按钮
            //  goodsSortList:[],//商品分类列表
            //  activeName:'',//商品分类的默认选中哪个
        }
    },
    mounted() {
      this.getData()  //获取商品列表
      this.getGoodsSortList()
    },
   
    methods: {
        //获取商品分类列表
      async getGoodsSortList(){
        let result =await this.$API.reqGoodsSortList()
        if(result.code==200){
          this.goodsSortList=result.data
          this.activeName=this.goodsSortList[0].name
        }
      },
      async getData(){
        let result =await this.$API.reqAllList({current:this.page,size:this.limit})
        if(result.code==200){
          this.limit=parseInt(result.data.size)
          this.total=parseInt(result.data.total)
          this.pageList=result.data.pageList
          this.pageList.forEach(item=>{
            item.webUserDto.icon="http://localhost/visitor/file/download/"+item.webUserDto.icon
          })
        }
      },
       handleCurrentChange(pager=1){
        this.page=pager

        this.getData()
      },
      //商品详细
      showDetail(list){
        this.dialogVisible = true
        this.detailList=list
      },
      async showOtherInfo(otherUserInfo){
        let result=await this.$API.reqCheckFriend(otherUserInfo.uid)
        if(result.code!=200){
          this.contractOrAdd=1
          if(result.message=="请求添加自己失败！"){
            this.contractOrAdd=2
          }
          
        }else{
          this.contractOrAdd=0
        }
        this.otherUserInfo=otherUserInfo
        this.dialogVisible=false
        this.dialogVisible1=true
      },
      //联系其他人
        contract(uid){
            this.$bus.$emit('chatElsePage',uid)
            this.$router.push('/message')
         },
      //添加好友
      async addFriend(uid){
        let result = await this.$API.reqAddFriend(uid)
        console.log(result);
        if(result.code==200){
         this.$message({message:"已发送请求",type:'success'})
        }
        else if(result.code==400&&result.message=='重复请求！'){
          this.$message({message:"已发送请求",type:'success'})
        }
      }


      //tab分类栏
      // async handleClick(tab, event) {
      //   const goodsSort=this.goodsSortList.filter(item=>item.name==this.activeName)
      //   //[{…}] goodsSort的结构是这样的
      //   const result = await this.$API.reqGetListBySortId(goodsSort[0].id)
      //   if(result.code==200){
      //     this.pageList=result.data
      //   }
        
      // }
   
},

}
</script>

<style lang="less" scoped>
  .index-body{
    
    width: 80%;
    margin: 0 auto;
  }
  .index-body-p-1{
    text-align: center;
    font-weight: bold;
    font-family:  "Helvetica Neue" ;
    font-size: 35px;
    color: black;
    padding-top:80px;
  }
  .el-row {
    margin-bottom: 20px;
  
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
    .time {
    font-size: 13px;
    color: #999;
    padding-top:10px ;
  }
  
  .bottom {
    margin-top: 7px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }


</style>