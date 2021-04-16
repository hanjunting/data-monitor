<template>
  <div id="data-table">
    <el-table :data="listData" stripe style="height:500px; overflow:scroll" >
        <el-table-column prop="Index" label="index"></el-table-column>
        <el-table-column prop="src_ip" label="源ip"></el-table-column>
        <el-table-column prop="src_port" label="源端口"></el-table-column>
        <el-table-column prop="dst_ip" label="目标ip"></el-table-column>
        <el-table-column prop="dst_port" label="目标端口"></el-table-column>
        <el-table-column prop="proto_type" label="协议"></el-table-column>
        <el-table-column prop="classification" label="分类"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  props: [listData],
  data() {
    return {
      
    }
  }

}
</script>
