<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
			<el-col style="height: 100%;overflow: auto;">
<!--        <h1>在线流量分类</h1>-->
        <el-row style="height: 150px; "> <!--background-color: #E6E6FA-->
          <template style="alignment: center">
            <el-card>
            <el-input
              placeholder="源IP地址"
              v-model="inputData.src_ip"
              clearable
              style="width:10%; margin-left: 20px;margin-top: 20px">
            </el-input>
            <el-input
              placeholder="目的IP地址"
              v-model="inputData.dst_ip"
              clearable
              style="width:10%; margin-left: 20px;margin-top: 20px">
            </el-input>
            <el-input
              placeholder="源端口"
              v-model="inputData.src_port"
              clearable
              style="width:10%; margin-left: 20px;margin-top: 20px">
            </el-input>
            <el-input
              placeholder="目的端口"
              v-model="inputData.dst_port"
              clearable
              style="width:10%; margin-left: 20px;margin-top: 20px">
            </el-input>
            <el-select v-model="inputData.proto_type" placeholder="传输协议" clearable style="margin-left: 20px; margin-right: 20px;margin-top: 20px">
              <el-option
                v-for="item in proto_options"
                :key="item.value"
                :label="item.label"
                :value="item.label"></el-option>
            </el-select>
            <el-button type="primary" @click="startMonitor">开始检测</el-button>
            <el-button type="warning" @click="stop">停止检测</el-button>
            <el-button type="danger" @click="reset">复位</el-button>
          </el-card>
          </template>
        </el-row>

        <el-row style="height: 55%; margin-left: 20px; margin-top: 50px">
          <el-col :span="12" style="width: 50%">
            <template style="height: 100%">
<!--               <visitorPie :pieData="pieData"></visitorPie>-->
              <div id="fig_pie" style="height: 500px"></div>
              <keep-alive></keep-alive>
            </template>
          </el-col>
          <el-col :span="12" style="width: 50%">
            <template style="height: 100%">
              <div id="fig_catagory" style="height: 500px"></div>
<!--                <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>-->
            </template>
          </el-col>
        </el-row>
        <el-divider><i class=el-icon-notebook-1></i></el-divider>
        <el-row style="height: 50%">
          <!-- <div>{{listData}}</div> -->
          <template>
            <el-table :data="listData" ref="multipleTable" border stripe style="margin-left: 40px;width: 90%" height="250">
            <el-table-column prop="index"  label="编号"></el-table-column>
            <el-table-column prop="src_ip"  label="源IP地址"></el-table-column>
            <el-table-column prop="dst_ip"  label="目的IP地址"></el-table-column>
            <el-table-column prop="src_port"  label="源端口"></el-table-column>
            <el-table-column prop="dst_port"  label="目的端口"></el-table-column>
            <el-table-column prop="proto_type"  label="传输层协议"></el-table-column>
            <el-table-column prop="classification"  label="流量类型"></el-table-column>
          </el-table>
          </template>
        </el-row>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    import Figure from '../figure/figure.js'
    import { getStatData, getIPstream } from '../server/request.js'
    import {
      pie_config_on,
      cata_config_on,
      pie_data_default_on,
      cata_data_default_on,
      setPieData,
      setCataData,
    } from '../figure/fig_config.js'
    // import { setTimer } from '../utils/utils'

    export default {
        data() {
            return {
                pie: null,
                cata: null,
                pieDomNode:null,
                cataDomNode: null,
                // 输入ip和端口信息
                inputData: {
                    src_ip: '',
                    dst_ip: '',
                    src_port: '',
                    dst_port: '',
                    proto_type: 'TCP'
                },
                proto_options: [{
                  value: 'op1',
                  label: 'TCP'
                  }, {
                  value: 'op2',
                  label: 'UDP'
                    }
                  ],
                timer: null,
                // 饼图信息
                pieData: [],
                // 柱状图信息
                sevenDay: [],
    			      sevenDate: [[],[],[]],
                catagoryData:[],
                // 表格信息
                listData: [],
                statData: []
            }
        },
        mounted() {
            // 初始化饼图
            const pieDomNode = document.getElementById("fig_pie");
            this.pie = new Figure(pieDomNode, pie_config_on);
            this.pie.setData(pie_data_default_on, setPieData);
            // 初始化柱形图
            const cataDomNode = document.getElementById("fig_catagory");
            this.cata = new Figure(cataDomNode, cata_config_on);
            this.cata.setData(cata_data_default_on, setCataData);
        },
        components: {
          // visitorPie,
          // tendency,
        },
        methods: {
            async setTimer(fun, delay) {
              const f = async () => {
                await fun();
                this.timer = setTimeout(async() => {
                  await f();
                },delay);
              }
              await f();
            },

            async startMonitor() {
              const {src_ip, dst_ip} = this.inputData;
                if (src_ip && dst_ip) {
                  this.setTimer(async () => {
                    await this.getMonitorData();
                    this.renderFigure();
                  }, 2000);
                } else{
                    alert("请输入源ip和目标ip")
                }
             
            },
          
            async getMonitorData() {
              let res = null;
              try{
                res = await getStatData(this.inputData);
                const { status, data } = res;
                if (status === 200) {
                  const { statDetails, tableData } = data;
                  // 表格
                  this.listData = tableData.concat(this.listData);
                  // 统计图
                  this.statData = [];
                  Object.keys(statDetails).forEach(item => {
                      this.statData.push({
                          name: item,
                          value: statDetails[item]
                      });
                  })
                }
              } catch(e) {}
            },

            renderFigure() {
                console.log('render', this.statData)
                this.pie.setData(this.statData, setPieData);
                this.cata.setData(this.statData, setCataData);
            },

            stop() {
                clearTimeout(this.timer);
            },
            reset() {
                clearTimeout(this.timer);
                this.listData = [];
                console.log('reset',this.init_pie_data);
                this.pie.setData(pie_data_default_on, setPieData);
                this.cata.setData(cata_data_default_on, setCataData);
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
