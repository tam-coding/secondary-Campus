<template>
  <div class="index-header">


    <!--    网页主体-->
    <el-row style="width: 80%;margin: 0 auto;padding-top: 80px;margin-bottom: 40px;">
      <el-col>
        <h2>闲置卖钱：</h2>
        <el-card shadow="always">
          <!-- :rules="rules" -->
          <el-form label-position="top" label-width="80px" :model="submitGoodsForm"  :rules="rules" ref="ruleForm" >
            <el-col :span="18" :offset="2">
              <el-form-item label="商品图" enctype="multipart/form-data" prop="goodsImages">
                <!--图片上传组件 :on-success="submitSuccess" :on-error="submitError" :auto-upload="false" :on-exceed="submitIndexOut"-->
                <el-upload
                  :on-remove="handleRemove"

                  multiple
                  action="/web/file/upload"
                  list-type="picture-card"
                  accept="image/*"
                  :data="uploadData"
                  :headers="headers"
                  :limit="4"
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
            <el-col :span="9" :offset="2" style="margin-top: 50px;">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="submitGoodsForm.name" maxlength="25" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2" style="margin-top: 50px;">
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="submitGoodsForm.price"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="9" :offset="2" style="margin-top: 20px;">
              <el-form-item label="商品介绍" prop="description">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 8}"
                  placeholder="请输入内容"
                  v-model="submitGoodsForm.description"
                  maxlength="100"
                  show-word-limit>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2" style="margin-top: 20px;">
              <el-form-item label="商品分类"  prop="goodsSortId">
                <el-select v-model="submitGoodsForm.goodsSortId" placeholder="请选择">
                  <el-option
                    v-for="item in goodsSortList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                
              </el-form-item>
            </el-col>
           
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="9">
        
        <el-button type="primary"  style="width: 100%;" @click="saveGoodsInfo">保存</el-button>
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
        GoodsForm:{},
        dialogVisible:true,
        dialogImageUrl:'',
        submitGoodsForm:{
            description: "",
            goodsSortId: null,
            goodsImages: [
            ],
            name: "",
            price: null,
          },
        goodsSortList:[], //商品分类的列表
        uploadData:{},//传图片的参数
        headers:{}, //上传图片携带token
        dialogVisible:false,//图片放大效果
        dialogImageUrl:'',//放大图片的url
         rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { max: 25, message: '长度不能超过25个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'change' },
            { validator: this.validatePrice, trigger: 'blur' }
          ],
          
          description: [
            { required: true, message: '请输入产品描述', trigger: 'blur' },
            { max: 100, message: '长度不能超过100个字符', trigger: 'blur' }
          ],
          goodsImages: [
            { required: true },
         
          ],
          goodsSortId: [
            { required: true, message: '请选择商品分类', trigger: 'blur' },
          
          ]
        }
      }
    },
    mounted(){
       this.headers={
          Authorization:getToken()
        },
        this.getGoodsSortList()
        
    },
    methods:{
      //获取商品分类列表
      async getGoodsSortList(){
        let result =await this.$API.reqGoodsSortList()
        if(result.code==200){
          this.goodsSortList=result.data
        }
      },
      async saveGoodsInfo(){
        
        let result=await this.$API.reqSaveGoodsInfo(this.submitGoodsForm)
        if(result.code==200){
          this.$message({type:"success",message:"添加闲置商品成功！"})
          this.$router.replace('/home')
        }
        console.log(result);
      },
      //上传图片之前的钩子
      async handleBeforeUpload(){
        //获取上传图片需要的fileUsedId
        let result=await this.$API.reqGetFileId('商品')
        if(result.code==200){ 
            this.uploadData.fileUseId=result.data.id
    
        }
      },
      //上传图片成功
      submitSuccess(response, file, fileList){
        this.submitGoodsForm.goodsImages.push(response.data.id)
     
      },
      // 图片放大
      handlePictureCardPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //删除图片
      handleRemove(file, fileList){
          const index=this.submitGoodsForm.goodsImages.indexOf(file.response.data.id)
         if(index>-1){
          this.submitGoodsForm.goodsImages.splice(index,1)
         }
      },
      //验证价格是数字
      validatePrice(rule, value, callback) {
      // 自定义价格验证函数，只允许输入数字
      if (value === '' || /^[0-9]+$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入有效的数字'));
      }
    },
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