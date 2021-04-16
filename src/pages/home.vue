<template>
	<div class="manage_page fillcontain">
	  <el-container style="background-color: #e4e4e4">
	  <el-row style="height:8%">
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
		<el-row style="height: 92%;">
	  	<el-col :span="4"  style="min-height: 100%; background-color: #545c64;">
				<el-menu router :default-active="this.$route.path"
				    class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
					<el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-menu-item index="/dashboard"><i class="el-icon-s-unfold"></i>在线检测</el-menu-item>
          <el-menu-item index="/offline"><i class="el-icon-s-unfold"></i>离线检测</el-menu-item>
          <el-menu-item><i class="el-icon-copy-document"></i>模型展示</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="18" :offset="1" style="height: 80%;overflow: auto;">
        <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }" style="margin-top:50px">
          <el-image style="width: 100%; height: 99%; background-color: #e4e4e4"
          :src="require('../assets/bupt.png')">
          </el-image>
            <div style="padding: 14px;">
              <span>北京邮电大学</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <a href="http://localhost:8080/#/dashboard">在线检测</a>
              </div>
            </div>
          </el-card>
        </el-col>
			</el-col>
	</el-row>
  	</div>
</template>

<style>
  .huihuang {
    margin-top: 30px;
    text-align: center;
    font-size: 40px;
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

<script>
    // import headTop from '../components/headTop'
    import axios from 'axios'
    // import visitorPie from "../components/visitorPie"
    // import tendency from "../components/tendency"
    export default {
      data() {
        return {
          currentDate: new Date(),
          src_ip: '',
          dst_ip: '',
          src_port: '',
          dst_port: '',
          proto_type:'',
          subject: '在线',
          pieData: {},
          tableData: [{
            ip: '10.3.8.211',
            type: 'chat',
            volume: '20%'
          }, {
            ip: '192.168.0.1',
            type: 'e-mail',
            volume: '80%'
          }],
          options: [{
            value: 'op1',
            label: '10.3.8.211'
          }, {
            value: 'op2',
            label: '192.168.0.1'
          }],
          value:'',
          sevenDay: [],
    			sevenDate: [[],[],[]],
        }
      },
      components: {
        // headTop,
        // visitorPie,
        // tendency,
      },
      mounted() {
        this.initData();
        this.sevenDay.push('chat');
        this.sevenDay.push('e-mail');
        this.sevenDay.push('flow');
        this.getSevenDate();
        console.log(this.src_ip)
        console.log('cdc')
      },
      methods: {
        start() {
          console.log(this.src_ip);
          let data = {'src_ip': this.src_ip}
          console.log(data)
          axios.post('/api/online_classify/test/', data)   //**************************
          .then(response => {
            this.pieData = response.data['pie']
            this.tableData = response.data['records']
            console.log(this.pieData)
            console.log(this.tableData)
          })
          .catch(function (error) {
            console.log(error)
          });
        },
        async initData() {
          this.pieData = {
            'beijing': 100,
            'shanghai':123,
            'shenzhen':45,
            'hangzhou':76,
            'qita':8}
        },
        getSevenDate() {
          this.sevenDate[0].push(10,12,23);
          this.sevenDate[1].push(23,45,63);
          this.sevenDate[2].push(43,12,31);
        }
      }
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
    margin-bottom: 20px;
	}

</style>
