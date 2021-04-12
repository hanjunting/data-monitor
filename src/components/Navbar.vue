<template>
    <el-menu
      default-active='dynamic'
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router='true'
    >
      <el-menu-item index="dynamic" >
        <i class="el-icon-menu"></i>
        <span slot="title">动态监控</span>
      </el-menu-item>
      <el-menu-item index="static">
        <i class="el-icon-menu"></i>
        <span slot="title">静态监控</span>
      </el-menu-item>
      <el-menu-item index="figure">
        <i class="el-icon-document"></i>
        <span slot="title">图像展示</span>
      </el-menu-item>
  </el-menu>
</template>