<!-- HTML -->
<template>
  <!-- 组件模板，有且只有一个根元素 -->
  <div id="login" @keyup.enter="submitForm">
    <el-card class="login-card">
        <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span class="login-title">大家乐超市管理系统</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="users"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      > 
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="users.username" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="确认密码" prop="password">
          <el-input type="password" v-model="users.password" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 提交和重置按钮 -->
        <el-form-item>
            <!-- 提交 -->
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <!-- 重置 -->
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<!-- JS -->
<script>

export default {
    data(){
        return {
            users: {
                username: '',
                password: '',
            },
            rules: { //用户名验证
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                password: [ //密码验证
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    
    methods: {
        //登录
        submitForm() {
          //声明常用数据
          const _this = this;
          const ruleForm = this.$refs.ruleForm;
          const users = this.users

             ruleForm.validate((valid) => {
                if (valid) {  //验证成功
                    
                    //发送axios
                  _this.$axios.post('http://localhost:3000/login',users)
                    .then(({data}) => {
                      if(data.success){ //后端验证用户名是否正确
                        _this.$message({
                          message: data.message, //验证成功 进行登录
                          duration: 800,
                          type: 'success',
                          onClose:() => {
                            //记录登录id信息
                            window.localStorage.setItem('token',data.token)
                            //记录用户组信息
                            window.localStorage.setItem('userGroup',data.userGroup)
                            _this.$router.push('/index/account')
                          }
                          
                        });
                            
                      }else {
                        _this.$message({ //后端验证失败
                          showClose: true,
                          message: '验证失败，用户名或密码错误！',
                          type: 'error'
                        });
                  
                      }
                    })
                    .catch(err => {
                      console.log(err)
                    })

                } else {    //前端验证失败
                    _this.$message({
                      showClose: true,
                      message: '验证失败!请修改',
                      type: 'error'
                    })
                  return false;
                }
            })

        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

    }
   
}
</script>

<!-- CSS -->
<style lang="less">
#login {
    display: flex;
    justify-content: center;
    height: 100%;
    background: url('../assets/images//timg.jpg') no-repeat center;
    .login-card {
        align-self: center;
        width: 500px;
        .login-title {
            font-weight: bold;
            font-size: 18px;
        }
    }
}
</style>