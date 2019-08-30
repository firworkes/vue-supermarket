<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div class="ChangePwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码账号</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!-- 修改密码表单 -->
      <el-form
        status-icon
        ref="formLabelAlign"
        :rules="rules"
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <!-- 旧密码 -->
        <el-form-item label="原密码" prop="password">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="formLabelAlign.newPassword"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="affirmPassword">
          <el-input v-model="formLabelAlign.affirmPassword"></el-input>
        </el-form-item>
        <!-- 修改按钮 -->
        <el-button @click="submitForm" type="success">修改</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<!-- JS -->
<script>
export default {

  data() {
    //正则
    const pwdReg = function(value) {
      const reg = /^[A-Za-z0-9]+$/;
      return reg.test(value)
    }
    //自定义验证密码
    var checkpass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("新密码不能为空!"));
      }else if(value !== this.formLabelAlign.affirmPassword) {
        callback(new Error("两次密码不一致!"))
      }else if(!pwdReg(value)) {
        callback(new Error("新密码只能是数字和字符！"))
      }else {
        callback(); //验证成功，放行 
      }
    };

    //再次验证新密码
    const checkConfirmPwd = (rule, value, callback) => {
      if(value !== this.formLabelAlign.newPassword) {
        callback(new Error("两次密码不一致!"))
      }else {
        //再次验证新密码的内容合法
        this.$refs.formLabelAlign.validateField("newPassword")
        callback(); //合法方形
      }
    }

    return {
      labelPosition: "top",
      formLabelAlign: {
        id: "",
        password: "", //旧密码
        newPassword: "", //新密码
        affirmPassword: "" //确认密码
      },
      rules: {
        password: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        newPassword: [
          { validator: checkpass, trigger: 'blur' }
        ],
        affirmPassword: [
          { validator: checkConfirmPwd, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //缓存this
      const _this = this;
      //获取整个表单，调用验证方法
    this.$refs.formLabelAlign.validate((valid) => {
      if(valid) {

        _this.$axios.post('http://localhost:3000/users/changepwd',{
          token: localStorage.getItem('token'),
          password: this.formLabelAlign.password,
          newPassword: this.formLabelAlign.newPassword
        })
          .then( ({data}) => {
              if(data.success) {
                _this.$message({
                  message: data.message,
                  type: 'success',
                  duration: 1000,
                  showClose: true,
                  onClose(){
                    _this.$router.push('/')
                  }
                })
              }else {
                _this.$message({
                  type: 'error',
                  message: data.message,
                  duration: 1000,
                  showClose: true,
                  onClose(){
                    _this.$router.push('/')
                  }
                })
              }
          })

      }else {
        console.log('前端验证没通过，不允许通过')
        return false;
      }
    }) 

    }
  }
};
</script>

<!-- CSS -->
<style lang="less">
.el-input {
  width: 300px;
}
</style>