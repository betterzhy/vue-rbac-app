<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">

    <router-link to="/home">
      <el-menu-item index="0">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>系统工具</span>
      </template>

      <router-link to="/user">
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/role">
        <el-menu-item index="1-2">
          <template slot="title">
            <i class="el-icon-rank"></i>
            <span slot="title">角色管理</span>
          </template>
        </el-menu-item>
      </router-link>

      <router-link to="/perm">
        <el-menu-item index="1-3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">权限管理</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu'
}
</script>

<style scoped>
.el-menu-vertical {
  height: 100%;
}
</style>
