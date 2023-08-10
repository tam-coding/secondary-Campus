<template>
  <div class="registerDivClass">
    <el-card shadow="always" style="top:70px;margin: 0 auto;width: 29%;min-height: 650px;position: relative;">
      <div style="text-align:center;margin-top: 30px;">
        <img src="../assets/loginLogo.jpg" alt="logoImg" style="max-width: 120px;">
        <h3 style="font-weight: bont;margin-top: 20px;">注册</h3>
      </div>
      <div style="text-align: center;margin-left: 20px;margin-top: 50px;">

        <el-input placeholder="请输入手机号" v-model="inputPhone" clearable maxlength="11" show-word-limit>
          <template slot="prepend">手机号</template>
          <!-- <template slot="append" @click="getLoginCode" ><div class="touch">获取验证码</div></template> -->
            <el-button type="info" slot="append" plain @click="getLoginCode">获取验证码</el-button>
        </el-input>

        <el-input  clearable maxlength="6" show-word-limit style="margin-top: 30px;" v-model="loginCode">
          <template slot="prepend"><span >验证码:</span></template>
        </el-input>


        <el-input placeholder="默认为手机号" style="margin-top: 30px;" v-model="inputPassword" show-password maxlength="30">
          <template slot="prepend" ><span >密码：&nbsp;</span></template>
        </el-input>


        <el-input placeholder="请输入邮箱" v-model="inputEmail" clearable maxlength="30"  style="margin-top: 30px;">
          <template slot="prepend"><span >邮箱：&nbsp;</span></template>
        </el-input>

      </div>
      <div style="text-align: center;margin-left: 10px;margin-top: 50px;">
        <el-button type="primary" style="min-width: 80%;" @click="register">注册</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="center" style="top: 10px;">
        <el-col :span="24">
          <h6 style="text-align: center;color: #757575;">二手交易系统 版权所有</h6>
          <h6 style="text-align: center;color: #757575;">Copyright © 2023</h6>
        </el-col>
      </el-row>
    </el-card>

 
  </div>
</template>

<script>
import {getUID} from '@/utils/uid'
  export default {
    name: "register",
    data(){
      return{
        inputPhone:"",
        inputPassword:"",
        inputEmail:"",
        loginCode:'' //登录验证码
      }
    },
    methods: {
      //手机验证码
      async getLoginCode(){
        //验证手机号格式
        const phoneNumberRegex = /^1[3-9]\d{9}$/;
        if(phoneNumberRegex.test(this.inputPhone)){
          let result =await this.$API.reqCode(this.inputPhone)
          if(result.code==200){
            this.loginCode=result.data
          }
        }else{
          this.$message({type:'warning',message:'请输入正确的手机号'})
        }
        
          
        },
        //注册
        async register(){
          //验证邮箱格式
          // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // let uid=getUID()

          
          let result=await this.$API.reqLoginByCode({phone: this.inputPhone,code:this.loginCode,email:this.inputEmail,password:this.inputPassword,uid:this.inputPhone})
          console.log(result);

          if(result.code==200){
            this.$message('注册成功')
            this.$router.replace('/login')
          }
          //   if(emailRegex.test(this.inputEmail)){
          // await this.$store.dispatch("user/getCodeLogin",{phone: this.inputPhone,code:this.loginCode,email:this.inputEmail,password:this.inputPassword})
          // this.$router.push(`/login?phone=${this.inputPhone}`)
          //   }
        }
    },
  
  }
</script>

<style scoped>
  .registerDivClass{
    background: url("https://i.loli.net/2019/12/15/A2XS7tNrHCM9f4R.png");
    height: 792px;
  }

</style>
