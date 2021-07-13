<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>后台RBAC权限管理系统</strong>
        <div class="header-nav">
          <el-avatar :src="userInfo.avatar"></el-avatar>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-tools">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link href="https://www.google.com/">Google</el-link>
          <el-link href="https://cn.bing.com/">Bing</el-link>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from './inc/SideMenu'

export default {
  name: 'Index',
  components: {
    SideMenu
  },
  data () {
    return {
      userInfo: {
        id: '',
        username: '',
        avatar: ''
      }
    }
  },
  methods: {
    initUserInfo () {
      this.$axios.get('/api/user/getUserProfile').then(res => {
        this.userInfo.id = res.data.data.id
        this.userInfo.username = res.data.data.username
        this.userInfo.avatar = res.data.data.avatar
      })
    }
  },
  created () {
    this.initUserInfo()
  }
}
</script>

<style scoped>
.header-nav {
  float: right;
  width: 220px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
}

.el-header {
  background-color: azure;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-menu-vertical {
  height: 100%;
}
</style>
