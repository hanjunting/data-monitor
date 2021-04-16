<template>
    <div>
<!--        <div>dynamic</div>-->
        <div>
            <el-input placeholder="源ip" type="text" v-model="inputData.src_ip" clearable></el-input>
            <el-input placeholder="源端口" type="text" v-model="inputData.src_port" clearable></el-input>
            <el-input placeholder="目的ip" type="text" v-model="inputData.dst_ip" clearable></el-input>
            <el-input placeholder="目的端口" type="text" v-model="inputData.dst_port" clearable></el-input>
            <el-select placeholder="协议" v-model="inputData.proto_type" clearable>
                <el-option label="TCP协议" value="TCP"></el-option>
                <el-option label="UDP协议" value="UDP"></el-option>
            </el-select>
        </div>
        <button v-on:click="startMonitor">test</button>
        <button v-on:click="stop">stop</button>
        <button v-on:click="reset">reset</button>
        <div id="fig_pie" style="height:500px"></div>
        <div id="fig_catagory" style="height:500px"></div>
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
    </div>
</template>

<script>
    // import * as echarts from 'echarts'
    import Figure from '../figure/figure.js'
    import { getStatData, getIPstream } from '../server/request.js'
    import {
        pie_config,
        cata_config,
        pie_data_default,
        cata_data_default,
        setPieData,
        setCataData,
        } from '../figure/fig_config.js'


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
                timer: null,
                // 饼图信息
                pieData: [],
                // 柱状图信息
                catagoryData:[],
                // 表格信息
                listData: [],
            }
        },
        mounted() {
            // 初始化饼图
            const pieDomNode = document.getElementById("fig_pie");
            this.pie = new Figure(pieDomNode, pie_config);
            this.pie.setData(pie_data_default, setPieData);
            // 初始化柱形图
            const cataDomNode = document.getElementById("fig_catagory");
            this.cata = new Figure(cataDomNode, cata_config);
            this.cata.setData(cata_data_default, setCataData);
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
                            this.listData = this.listData.concat(data);
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
                this.pie.setData(pie_data_default, setPieData);
                this.cata.setData(cata_data_default, setCataData);
            }

        }


    }


</script>
