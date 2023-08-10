<template>
    <div class="loginDivClass">
      <el-card shadow="always" style="top:70px;margin: 0 auto;width: 29%;min-height: 650px;position: relative;">
        <div style="text-align:center;margin-top: 30px;">
          <img src="../assets/loginLogo.jpg" alt="logoImg" style="max-width: 120px;">
          <h3 style="font-weight: 400;margin-top: 20px;">登录</h3>
        </div>
        <div style="text-align: center;margin-left: 20px;margin-top: 50px;">
          <el-input placeholder="请输入手机号" v-model="inputPhone" clearable maxlength="11"   show-word-limit>
            <template slot="prepend">手机号：</template>
          </el-input>
          <el-input placeholder="请输入密码" style="margin-top: 50px;" v-model="inputPassword" show-password maxlength="30" show-word-limit>
            <template slot="prepend"><span style="padding-left: 7.2px;padding-right: 7.2px;">密码：</span></template>
          </el-input>
        </div>
        <div style="text-align: center;margin-left: 10px;margin-top: 110px;">
          <el-button type="primary" style="min-width: 80%;" @click="login" >登录</el-button>
        </div>
        <el-row type="flex" class="row-bg" justify="center" style="top: 60px;">
          <el-col :span="24">
            <h6 style="text-align: center;color: #757575;">交易系统 版权所有</h6>
            <h6 style="text-align: center;color: #757575;">Copyright © 2023</h6>
          </el-col>
        </el-row>
      </el-card>


    </div>
</template>

<script>
  import {setToken} from '@/utils/token'
  import {setUserInfo} from '@/utils/userInfo'
    export default {
        name: "login",
        data() {
          return {
            inputPhone:this.$route.query.phone||'',//输入的手机号
            inputPassword:"",//输入的密码

          }
        },
        methods: {
          async login(){
            let result=await this.$API.reqLoginByPassword({ phone: this.inputPhone,password: this.inputPassword})
            console.log(result);
            if(result.code==200){
              setToken(result.data.token)
              setUserInfo(result.data.userDto)
              this.$bus.$emit('isLogin',true)
              this.$router.replace('/home')
            }else{
              this.$message({type:'error',message:result.message})
            }
          }
         
        },
    }
</script>

<style scoped>
  .loginDivClass{
    background: url("https://i.loli.net/2019/12/15/A2XS7tNrHCM9f4R.png");
    height: 792px;
  }
</style>
