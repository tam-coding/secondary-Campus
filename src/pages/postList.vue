<template>
  <div class="index-body">
    <p class="index-body-p-1" >&nbsp;&nbsp;<span style="background-color: skyblue;padding:5px 5px 2px 5px;border-radius:8px;margin-left:3px;margin-bottom:8px">论&nbsp;&nbsp;坛</span> :</p>
   <!-- <div style="border-top: 3px solid #ccc;"></div> -->
  <el-card style="margin-top:20px">
        <div style="text-align:right">
          <el-button type="primary" class="el-icon-circle-plus" @click="addPost"> 添加Post</el-button>
        </div>
        <div class="post">
          <el-card v-for="(post,index) in postList" :key="post.id" style="margin:25px 56px;width:40%">
          <div class="post-section">

            <div class="block"><el-avatar shape="square" :size="120" :src="post.postImageList[0]?.image"></el-avatar></div>

            <div class="post-content">
                <div style="color: #333; font-size:20px;font-weight:bold">{{post.title}}  </div>
                <div style="word-break: break-all;max-height:80px;overflow:hidden">{{post.content}}</div>


                <div class="likeAndComment">
                  <div>
                    <span >
                      <span v-if="!post.clickLike" @click="like(post)" >
                        <svg t="1691735133867" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8836" width="20" height="20"><path d="M759.1936 826.9824c-20.0704 21.9136-43.52 32.5632-71.4752 32.5632L420.2496 859.5456c-32.768 0-59.392-27.8528-59.392-62.0544L360.8576 468.2752c28.2624-29.9008 103.936-118.4768 147.0464-250.88 6.7584-20.7872 21.8112-55.5008 47.3088-52.8384 19.8656 1.9456 40.6528 24.4736 43.7248 47.104 1.8432 16.896-14.4384 115.5072-40.5504 167.6288L535.552 424.8576l241.152 0c32.768 0 59.392 27.8528 59.4944 63.2832C838.8608 556.2368 829.952 749.9776 759.1936 826.9824zM296.448 797.3888c0 14.336-23.7568 31.0272-54.4768 31.0272-30.72 0-54.4768-16.6912-54.4768-31.0272L187.4944 486.912c0-14.336 23.7568-31.0272 54.4768-31.0272 30.72 0 54.4768 16.6912 54.4768 31.0272L296.448 797.3888zM895.6928 486.912c0-68.5056-53.3504-124.2112-118.8864-124.2112L629.1456 362.7008c19.6608-59.6992 31.9488-134.4512 28.5696-159.6416-7.0656-51.6096-49.664-95.6416-96.9728-100.2496-22.6304-2.1504-79.1552 2.56-109.1584 94.72-37.9904 116.736-103.8336 195.8912-128.9216 223.1296-20.48-16.6912-48.8448-26.8288-80.6912-26.8288-63.8976 0-113.9712 40.96-113.9712 93.184l0 310.4768c0 52.224 50.0736 93.184 113.9712 93.184 30.9248 0 58.4704-9.728 78.848-25.6 21.1968 33.9968 57.7536 56.6272 99.4304 56.6272l267.4688 0c44.3392 0 82.8416-17.408 114.3808-51.6096C904.704 758.3744 896.1024 496.7424 895.6928 486.912z" fill="#B3B3B3" p-id="8837"></path></svg>
                        {{post.likeCount}}
                      </span>
                      <!-- @click="cancelLike(post)" @click="like(post)"-->
                      <span v-else >
                        <svg t="1691735760641" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11458" width="20" height="20"><path d="M972.277839 540.75946c0 0 17.989887-43.146477 17.989887-69.765659 0-66.255437-58.357438-111.595803-127.53806-110.27947 0 0-131.194541-1.170074-147.429317-1.170074 37.442366-94.044694 46.071662-189.990757 31.738256-250.980862-15.064702-64.061549-53.969661-104.4291-111.595803-108.23184-76.347325-4.972814-126.806764 46.510439-128.415616 119.640061-1.755111 81.320139-26.765442 149.915725-69.034363 211.637125-11.115703 16.088517-22.816442 31.00696-36.126033 46.510439-6.142888 7.020444-25.449108 27.935515-28.666812 32.177034-45.486625 60.551327-45.194106 96.531101-45.486625 101.650174l0 436.730101c0 9.068073 74.153436 75.177251 183.555351 75.177251 23.986516-0.731296 299.100153-0.146259 312.994781 0 69.765659-8.483036 112.473358-56.748586 112.473358-118.616246 0-27.642997-8.044258-45.340365-8.044258-45.340365s61.721401-21.500109 61.721401-95.068508c0-36.418552-23.986516-70.643215-23.986516-70.643215s23.986516-45.632884 23.986516-76.347325C990.267726 559.773161 972.277839 540.75946 972.277839 540.75946L972.277839 540.75946zM972.277839 540.75946M33.732274 434.28273l220.266421 0 0 588.108418L33.732274 1022.391148 33.732274 434.28273 33.732274 434.28273zM33.732274 434.28273" fill="#1296db" p-id="11459"></path></svg>
                        {{post.likeCount}}
                      </span>
                      <span  @click="showDetail(post)">
                        <svg t="1691735586211" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10362" width="20" height="20"><path d="M289.013833 389.741547c-30.743156 0-55.704033 25.857868-55.704033 57.785222 0 31.906767 24.961076 57.764236 55.704033 57.764236 30.788126 0 55.704632-25.857469 55.704632-57.764236C344.718265 415.599416 319.801758 389.741547 289.013833 389.741547L289.013833 389.741547 289.013833 389.741547zM511.832162 389.741547c-30.783129 0-55.704632 25.857868-55.704632 57.785222 0 31.906767 24.921503 57.764236 55.704632 57.764236 30.743156 0 55.66306-25.857469 55.66306-57.764236C567.495222 415.599416 542.575118 389.741547 511.832162 389.741547L511.832162 389.741547 511.832162 389.741547zM734.610518 389.741547c-30.742956 0-55.707031 25.857868-55.707031 57.785222 0 31.906767 24.964074 57.764236 55.707031 57.764236 30.73816 0 55.702234-25.857469 55.702234-57.764236C790.312552 415.599416 765.348678 389.741547 734.610518 389.741547L734.610518 389.741547 734.610518 389.741547zM846.014786 128.488877 177.647539 128.488877c-61.528684 0-111.406666 51.748315-111.406666 115.572442l0 378.055678c0 63.803541 50.972241 122.622662 113.903973 122.622662l169.785485 0c29.562357 31.527624 152.047512 145.002288 152.047512 145.002288 5.434316 5.669156 14.235348 5.669156 19.663668 0 0 0 89.686992-88.341904 148.107183-145.002288l173.728612 0c62.934131 0 113.906571-58.818921 113.906571-122.622662l0-378.055678C957.383878 180.237191 907.500898 128.488877 846.014786 128.488877L846.014786 128.488877 846.014786 128.488877zM901.676847 622.116997c0 31.896374-26.752662 65.382471-58.199341 65.382471l-170.837772 0c-20.713956 0-39.323339 21.257587-39.323339 21.257587l-119.950474 111.137249-119.948275-111.137249c0 0-22.815931-21.257587-42.390659-21.257587l-170.882142 0c-31.444681 0-58.201939-33.486096-58.201939-65.382471l0-378.055678c0-31.926754 24.919105-57.779625 55.704632-57.779625l668.367247 0c30.747953 0 55.662061 25.852872 55.662061 57.779625L901.676847 622.116997 901.676847 622.116997 901.676847 622.116997z" fill="#272636" p-id="10363"></path></svg>
                        
                      </span>
                    </span>
                    <span style="color: #00000080; font-size:8px;">{{post.createTime.split('T')[0]}}</span>
                  </div>
                 

                  <span style="float:right">
                    <el-tooltip class="item" effect="dark" content="查看详细" placement="top">
                      <el-button type="success" icon="el-icon-more" circle @click="showDetail(post)"></el-button>
                    </el-tooltip>
                  </span>
                  </div>
            </div>
            
          </div>
        </el-card>
      </div>
  </el-card>
 
    

      <!-- -->
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
export default {
    name:'postList',
    data() {
        return {
            postList:[],//论坛文章列表
            limit:6,//每页多少条数据
            page:1,//当前页
            total:0,//总页数
            // clickLike:false,//点赞
        }
    },
    mounted(){
      this.getPostList()
    },
    methods:{
      async getPostList(){
        let result=await this.$API.reqGetPostList({"current": this.page,  "size": this.limit})
        if(result.code==200){
          const data=result.data.pageList
          data.forEach( async item => {
            this.$set(item,'clickLike',false)
            let result=await this.$API.reqCheckLike(item.id)
            if(result.code==200){
             item.clickLike=result.data==0?false:true
            }
          });
          this.postList=data
          this.total=parseInt(result.data.total)
          this.page=parseInt(result.data.current)
          
        }
      },
      // 分页器页数改变
      handleCurrentChange(pager=1){
        this.page=pager
        this.getPostList()
      },
      //查看post 详细
      showDetail(post){
        const postid=post.id
        this.$router.push({path:`/postdetail/${postid}`})

      },
      // 点赞
      async like(post){
        
        let result =await this.$API.reqSetLike(post.id)
        if(result){
          post.clickLike=!post.clickLike
          post.likeCount++
        }
      },
      // 取消点赞点赞
      // async like(post){
      //   post.clickLike=!post.clickLike
      //   let result =await this.$API.setLike(post.id)
      // },
      // 添加post
      addPost(){
        this.$router.push('/addpost')
      }

    }
}
</script>

<style>
 .index-body{
    
    width: 80%;
    margin: 100px auto 100px auto;
  }
 .index-body-p-1{
  text-align: center;
   font-weight: bold;
    font-family:  "Helvetica Neue" ;
    font-size: 35px;
    color: black;
    padding-top:80px;
  }
  .post{
    display: flex;
    
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .post-section{

    display: flex;
  }
  .post-content{
    margin-left:10px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: space-between;
  }
  .likeAndComment{
    display: flex;
    justify-content: space-between;
    cursor:pointer
  }
  .likeAndComment div{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .likeAndComment span span{
    margin: 1px 5px;
  }
</style>