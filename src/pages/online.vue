<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
<!--	  	<el-col :span="4"  style="min-height: 100%; background-color: #545c64;">-->
<!--				<el-menu router :default-active="this.$route.path"-->
<!--            background-color="#545c64"-->
<!--            text-color="#fff"-->
<!--            active-text-color="#ffd04b">-->
<!--          <el-image style="width: 100%; height: 99%; background-color: #e4e4e4"-->
<!--          :src="require('../assets/bupt_head.png')">-->
<!--          </el-image>-->
<!--					<el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>-->
<!--          <el-menu-item index="/dashboard"><i class="el-icon-s-unfold"></i>在线检测</el-menu-item>-->
<!--          <el-menu-item index="/offline"><i class="el-icon-s-unfold"></i>离线检测</el-menu-item>-->
<!--          <el-menu-item><i class="el-icon-copy-document"></i>模型展示</el-menu-item>-->
<!--				</el-menu>-->
<!--			</el-col>-->
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
<!--        <el-divider></el-divider>-->
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
    // import * as echarts from 'echarts'
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
    // import visitorPie from "../components/visitorPie"
    // import tendency from "../components/tendency"


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


            async startMonitor() {
                await this.getMonitorState();
                this.renderFigure();
                await this.getTableData();
            },

            async getMonitorState() {
                console.log('search!');
                // TODO: 确认默认ip和默认端口
                const {src_ip, dst_ip} = this.inputData;
                if (src_ip && dst_ip) {
                    try{
                        const res = await getStatData(this.inputData);
                        console.log('res----------',res);
                        const { status, data } = res;
                        const { details, total } = data;
                        if (status === 200) {
                            Object.keys(details).forEach(item => {
                                this.pieData.push({
                                    name: item,
                                    value: details[item]*100
                                });
                                this.catagoryData.push({
                                    name: item,
                                    value: details[item]*total
                                });
                            })
                        }
                    }catch(e){
                        console.log(e.message);
                    }
                }else{
                    alert("请输入源ip和目标ip")
                }

            },
            renderFigure() {
                this.pie.setData(this.pieData, setPieData);
                this.cata.setData(this.catagoryData, setCataData);
            },
            async getTableData() {
                const f = async() => {
                    const res = await getIPstream(this.inputData);
                    const { status, data } = res;
                    // console.log(data)
                        if (status === 200) {
                            this.listData = data.concat(this.listData);
                        } else {
                            new Throw(status);
                        }
                    this.timer = setTimeout(() => {
                        f();
                    },1000)
                }
                await f();
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
<!--<script>-->
<!--    // import headTop from '../components/headTop'-->
<!--    import axios from 'axios'-->
<!--    import visitorPie from "../components/visitorPie"-->
<!--    import tendency from "../components/tendency"-->
<!--    export default {-->
<!--      data() {-->
<!--        return {-->
<!--          src_ip: '',-->
<!--          dst_ip: '',-->
<!--          src_port: '',-->
<!--          dst_port: '',-->
<!--          proto_type:'',-->
<!--          subject: '在线',-->
<!--          pieData: {},-->
<!--          tableData: [{-->
<!--            ip: '10.3.8.211',-->
<!--            type: 'chat',-->
<!--            volume: '20%'-->
<!--          }, {-->
<!--            ip: '192.168.0.1',-->
<!--            type: 'e-mail',-->
<!--            volume: '80%'-->
<!--          }],-->
<!--          options: [-->
<!--          {-->
<!--            value: '选项一',-->
<!--            label: '127.0.0.1'-->
<!--          }-->
<!--          ],-->
<!--          proto_options: [{-->
<!--            value: 'op1',-->
<!--            label: 'TCP'-->
<!--          }, {-->
<!--            value: 'op2',-->
<!--            label: 'UDP'-->
<!--          }-->
<!--          ],-->
<!--          value:'',-->
<!--          sevenDay: [],-->
<!--    			sevenDate: [[],[],[]],-->
<!--        }-->
<!--      },-->
<!--      components: {-->
<!--        // headTop,-->
<!--        visitorPie,-->
<!--        tendency,-->
<!--      },-->
<!--      mounted() {-->
<!--        this.initData();-->
<!--        this.sevenDay.push('chat');-->
<!--        this.sevenDay.push('e-mail');-->
<!--        this.sevenDay.push('flow');-->
<!--        this.getSevenDate();-->
<!--        console.log(this.src_ip)-->
<!--        console.log('cdc')-->
<!--      },-->
<!--      methods: {-->
<!--        start() {-->
<!--          console.log(this.src_ip);-->
<!--          let data = {'src_ip': this.src_ip}-->
<!--          console.log(data)-->
<!--          axios.post('/api/online_classify/start/', data)   //**************************-->
<!--          .then(response => {-->
<!--            this.pieData = response.data['pie']-->
<!--            this.tableData = response.data['records']-->
<!--            console.log(this.pieData)-->
<!--            console.log(this.tableData)-->
<!--          })-->
<!--          .catch(function (error) {-->
<!--            console.log(error)-->
<!--          });-->
<!--        },-->
<!--        stop() {-->
<!--          axios.post('/api/online_classify/stop/')   //**************************-->
<!--          .catch(function (error) {-->
<!--            console.log(error)-->
<!--          });-->
<!--        },-->
<!--        reset() {-->
<!--          axios.post('/api/online_classify/reset/')   //**************************-->
<!--          .catch(function (error) {-->
<!--            console.log(error)-->
<!--          });-->
<!--        },-->
<!--        async initData() {-->
<!--          this.pieData = {-->
<!--            'chat': 5,-->
<!--            'streaming':10,-->
<!--            'p2p':36}-->
<!--        },-->
<!--        getSevenDate() {-->
<!--          this.sevenDate[0].push(10,12,23);-->
<!--          this.sevenDate[1].push(23,45,63);-->
<!--          this.sevenDate[2].push(43,12,31);-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--</script>-->


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
    margin-bottom: 20px;
	}

</style>
