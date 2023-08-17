<template>
  <div class="index-header">


    <!--    网页主体-->
    <el-row style="width: 80%;margin: 0 auto;padding-top: 80px;margin-bottom: 40px;">
      <el-col>
        <h2>添加Post:</h2>
        <el-card shadow="always">
          <el-form label-position="top" label-width="80px" :model="submitPostForm"  :rules="rules" ref="ruleForm" >
            <el-col :span="20" :offset="2">
              <el-form-item label="图片" enctype="multipart/form-data" prop="postImages">
                <!--图片上传组件 :on-success="submitSuccess" :on-error="submitError" :auto-upload="false" :on-exceed="submitIndexOut"-->
                <el-upload
                  :on-remove="handleRemove"
                  multiple
                  action="/web/file/upload"
                  list-type="picture-card"
                  accept="image/*"
                  :data="uploadData"
                  :headers="headers"
                  :on-preview="handlePictureCardPreview"
                  :on-success="submitSuccess"
                  :before-upload="handleBeforeUpload"
                  >
                  <i slot="default" class="el-icon-plus"></i>
              
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <!-- dialogImageUrl -->
                  <img width="100%" :src="dialogImageUrl " alt="">
                </el-dialog>
              
              </el-form-item>
            </el-col>
              
            <el-col :span="9" :offset="2" style="margin-top: 20px;">
              <el-form-item label="标题" prop="title">
                <el-input v-model="submitPostForm.title" maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </el-col>
        
             <el-col :span="9" :offset="2" style="margin-top: 20px;">
              <el-form-item label="内容" prop="content">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 8}"
                  placeholder="请输入内容"
                  v-model="submitPostForm.content"
                  maxlength="100"
                  
                  show-word-limit>
                </el-input>
              </el-form-item>
            </el-col>


  
           
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="9">
        
        <el-button type="primary"  style="width: 100%;" @click="savepostInfo">保存</el-button>
      </el-col>
    </el-row>

   
<!-- 图片放大的dialog -->
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

  </div>
</template>

<script>
import {getToken} from '@/utils/token'

  export default {
    name: "Add",
    data() {
      return {
        dialogVisible:true,
        dialogImageUrl:'',
        submitPostForm:{
            content: "",
            postImages: [
            ],
            title: "",
          },
        uploadData:{},//传图片的参数
        headers:{}, //上传图片携带token
        dialogVisible:false,//图片放大效果
        dialogImageUrl:'',//放大图片的url
         rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入Post内容', trigger: 'blur' },
            { max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
          ]
        //   postImages: [
        //     { validator: this.validatepostImages, trigger: 'change' },
        //   ],
        
        }
      }
    },
    mounted(){
       this.headers={
          Authorization:getToken()
        }
    },
    methods:{

      async savepostInfo(){
        
        let result=await this.$API.reqAddPost(this.submitPostForm)
        if(result.code==200){
          this.$message({type:"success",message:"添加Post成功！"})
          this.$router.replace('/home')
        }
        console.log(result);
      },
      //上传图片之前的钩子
      async handleBeforeUpload(file){
          if (this.submitPostForm.postImages.length >= 5) {
                this.$message.error('最多只能上传五张图片');
                return false; // 阻止上传
            }
        //获取上传图片需要的fileUsedId
        let result=await this.$API.reqGetFileId('论坛')
        if(result.code==200){ 
            this.uploadData.fileUseId=result.data.id
    
        }
      },
      //上传图片成功
      submitSuccess(response, file, fileList){
        
        if(fileList.length<=5){
        
        this.submitPostForm.postImages.push(response.data.id)

        }else{
            fileList.pop()
        }
        
        // 手动触发校验
        // this.$refs.ruleForm.validateField('postImages');
     
      },
      // 图片放大
      handlePictureCardPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //删除图片
      handleRemove(file, fileList){
          const index=this.submitPostForm.postImages.indexOf(file.response.data.id)
         if(index>-1){
          this.submitPostForm.postImages.splice(index,1)
         }
      },
    //     validatepostImages(rule, value, callback) {
    //         console.log(value.length);
    //     if (value.length <= 5) {
    //     callback();
    //     } else {
    //     callback(new Error('最多只能上传五张图片'));
    //     }
    // },
    },
    
  } 
</script>

<style scoped>
  h2 {
    font-weight: 400;
    color: #1f2f3d;
    font-size: 28px;
  }
</style>