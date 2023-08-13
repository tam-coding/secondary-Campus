<template>
  <div>
    <div style="padding-top:36px;display:flex;justify-content: center;margin:0px auto 2px auto">
      <h3 style="font-family:Helvetica Neue;font-weight:bold;font-size:60px;width:280px">sell your</h3>
      <div >
        <el-carousel  height="100px" direction="vertical" :autoplay="true" :interval="2000" indicator-position="none" style="width:370px" >
          <el-carousel-item v-for="item in ['闲 置 手 机','闲 置 电 脑',' 闲  置  书','AnyThing']" :key="item" >
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      
    </div>
     
    <List/>
    <postList/>
  </div>
</template>

<script>
import List from '@/pages/list.vue'
import postList from '@/pages/postList.vue'
export default {
    name:'Home',
    components:{List,postList}
}
</script>

<style>
.el-carousel__item h3 {
    /* color: #475669; */
    font-size: 70px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    color: #90bbe2;
    
  }
  
  .el-carousel__item:nth-child(2n+1) {
    color: #475669;
  }
</style>