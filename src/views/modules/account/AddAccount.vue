<!-- HTML -->
<template>
<!-- 组件模板，有且只有一个根元素 -->
<div class="AddAccount">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加编辑账号</span>
      </div>
      <!-- 表单 -->
      <div style="margin: 20px;"></div>
      <el-form 
      :label-position="labelPosition" 
      label-width="80px" 
      status-icon
      ref="addForm" 
      :model="formLabelAlign" 
      :rules="rules">
        <!-- 用户名-->
        <el-form-item label="用户名" prop="username">
          <el-input class="commodity-name" v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input class="commodity-name" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="newPassword">
          <el-input class="commodity-name" v-model="formLabelAlign.newPassword"></el-input>
        </el-form-item>
        <!-- 用户组 -->
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="formLabelAlign.userGroup" placeholder="请选择用户组">
              <el-option label="超级会员" value="1"></el-option>
              <el-option label="普通会员" value="2"></el-option>
            </el-select>
          </el-form-item>
        <div class="btnbox">
          <el-button @click="submitForm()" type="success">保存</el-button>
        </div>
      </el-form>
    </el-card>
</div>
</template>

<!-- JS -->
<script>

//正则函数
const pwdReg = function(value) {
  const reg = /^[A-Za-z0-9]+$/;
  return reg.test(value)
}

export default {
  data() {

    //自定义验证函数
    const checkPwd = (rule, value, callback) => {
      let len = value.length;
      if(value === '') {
        callback(new Error('密码不能为空'))
      }else if(len < 2 || len > 10) {
        callback(new Error('密码长度为2 ~ 10位'))
      }else if(!pwdReg(value)) {
        callback(new Error('只可以输入字母数字'))
      }else {
        if(this.formLabelAlign.newPassword !== '') {
          //再次触发一次验证
          this.$refs.addForm.validateField('newPassword')
        }
    }
  }

    //验证两次密码是否相同
    const confirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formLabelAlign.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

    return {
      labelPosition: "top",
      formLabelAlign: {
        username: '', //账号
        password: '',  //密码
        newPassword: '', //确认密码
        userGroup: '' //用户组
      },
      rules: { //用户名验证
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                password: [ //密码验证
                    { required: true, validator: checkPwd, trigger: 'blur' },
                ],
                newPassword: [
                  { required: true, validator: confirmPwd, trigger: 'blur' } //非空验证
                ],
                userGroup: [
                  { required: true, message:'选择用户组', trigger: 'change' } //非空验证
                ]
            }
    }
  },
  methods: {
    submitForm(){
      const _this = this;

      //获取整个表单，调用验证方法
      // this.$refs.addForm.validata(function(valid) { 
        //所有前端验证通过 valid：true，否则为false
        // if(valid) {

          //发送ajax
          _this.$axios.post('http://localhost:3000/users/addAccount',{
            username: this.formLabelAlign.username,
            password: this.formLabelAlign.password,
            userGroup: this.formLabelAlign.userGroup
          })
            .then(({data}) => {
              //判断
              if(data.success) {
                //成功弹出提示消息
                this.$message({
                  message: data.message,
                  showClose: true,
                  message: '恭喜你，用户添加成功！',
                  type: 'success',
                  duration: 500,
                  onClose(){
                    _this.$router.push('/index/account') //成功跳转页面
                  }
                  
                }); 
              }else {
                //失败弹出提示消息
                this.$message({
                  message: data.message,
                  showClose: true,
                  message: '温馨提示，用户添加失败！',
                  type: 'error',
                  duration: 500
                });
              }
            })
        // }else {
        //   console.log('前端验证不通过，不允许提交')
        //   return false;
        // }
      // })
  
    }
  }

}
</script>

<!-- CSS -->
<style lang="less">

.AddAccount {
    
    .el-input {
        width: 200px;
    }
    .commodity-name {
        width: 300px;
    }
    .btnbox {
      margin: 20px 0px;
    }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

</style>