<template>
  <div class="manage_page fillcontain">
    <el-container style="background-color: #e4e4e4;">
	  <el-row>
	    <el-col :span="4">
        <el-image style="width: 100%; height: 99%"
        :src="require('../assets/bupt_head.png')">
        </el-image>
      </el-col>
      <el-col :span="20" class="huihuang">
        <div><h1>智慧无线移动实验室</h1></div>
      </el-col>
	  </el-row>
	  </el-container>
    <el-row style="height: 100%;">
<!--      <el-drawer :direction="ltr" :visible.sync="true">-->
      <el-container>
      <el-col :span="4"  style="height: 100%; background-color: #545c64;">
          <Navbar style="height: 1000px"></Navbar>
      </el-col>
      <el-col :span="20" style="height: 100%">
        <div>
            <keep-alive>
              <router-view/>
            </keep-alive>
        </div>
      </el-col>
    </el-container>
<!--      </el-drawer>-->
    </el-row>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  mounted() {

  },
  methods: {
     gotoTest()  {
      //  var that = this;
      //   console.log(that);
      console.log('axios sent!');
      axios({
        method: 'POST',
        url: '/beginData',
        data: this.inputData,
      }).then(res => console.log(res.data))
        .catch(res => console.log(res.msg));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
    margin-top: 0px;
    margin-bottom: 20px;
	}
  .huihuang {
    //margin-top: 30px;
    text-align: center;
    font-size: 25px;
    }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

</style>
