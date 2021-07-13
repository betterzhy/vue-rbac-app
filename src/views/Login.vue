<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <div class="login-form"><h2>前端基于Vue实现</h2>
        <el-image style="width: 180px; height: 180px" :src="require('@/assets/logo.png')"></el-image>
        <p> 更多信息见Github</p>
        <p>后端SpringBoot、SpringSecurity</p>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item>
          <el-button style="border: none; background-color:#fafafa;">RBAC权限管理系统</el-button>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchaValue">
          <el-input v-model="loginForm.captchaValue" style="width: 140px; float: left"></el-input>
          <el-image :src="captchaImage" class="captchaImage" style="width: 130px; height: 40px"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="loginButton">登 录</el-button>
          <el-button type="info" @click="resetForm('loginForm')" class="resetButton">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      captchaImage: null,
      loginForm: {
        username: '',
        password: '',
        captchaValue: '',
        captchaKey: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ],
        captchaValue: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          {
            len: 5,
            message: '请输入 5 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    getCaptcha () {
      this.$axios.get('/api/captcha/generate').then(res => {
        this.captchaImage = res.data.data.base64Image
        this.loginForm.captchaKey = res.data.data.captchaKey
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginForm)
          const captchaVerifyParam = {
            captchaId: this.loginForm.captchaKey,
            captchaValue: this.loginForm.captchaValue
          }
          const signinParam = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          this.$axios.post('/api/captcha/verify', captchaVerifyParam).then(res => {
            if (!res.data.success) {
              this.$router.push('/login')
            }
          })
          this.$axios.post('/api/auth/signin', signinParam).then(res => {

          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    this.getCaptcha()
  }
}
</script>

<style scoped>
.el-row {
  background-color: #fafafa;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
}

.el-divider {
  height: 200px;
}

.el-form-item {
  width: 380px;
}

.captchaImage {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}

.loginButton {
  float: left;
  margin-left: 2px;
  width: 120px;

}

.resetButton {
  float: right;
  margin-right: 2px;
  width: 120px;
}

</style>
