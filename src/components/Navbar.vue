<template>
  <div>
    <el-menu
      default-active='dynamic'
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      align="left"
      router=true>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="online" >
        <i class="el-icon-s-unfold"></i>
        <span slot="title">动态监控</span>
      </el-menu-item>
      <el-menu-item index="offline">
        <i class="el-icon-s-unfold"></i>
        <span slot="title">静态监控</span>
      </el-menu-item>
      <el-menu-item index="figure">
        <i class="el-icon-document"></i>
        <span slot="title">模型展示</span>
      </el-menu-item>
  </el-menu>
  </div>
</template>

