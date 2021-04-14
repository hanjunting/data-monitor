<template>
    <div>
        <div>dynamic</div>
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
        <button v-on:click="searchTest">test</button>
        <div id="data-pie" style="height:500px"></div>
        <div id="data-catagory" style="height:500px"></div>
        <div id="data-table"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    import axios from 'axios';

    export default {
            
        data() {
            return {
                pieDomNode:null,
                cataDomNode: null,
                pieInstance: null,
                cataInstance: null,
                // 输入ip和端口信息
                inputData: {
                    src_ip: '', 
                    dst_ip: '',
                    src_port: '',
                    dst_port: '',
                    proto_type: 'TCP'
                },
                // 饼图信息
                pieData: [{value:0, name:'chart'},{value:0, name:'p-to-p'},{value:0, name:'streaming'}],
                
                // 饼图配置
                pieOptionsDefault: {
                    legend: {
                        top: 'bottom'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series:[{
                        name: '流量饼图',
                        type: 'pie',
                        radius: [0, 75],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data:[]
                    }],
                },
                // 柱状图信息
                catagoryData: {
                    xAxis: ['chart', 'streaming', 'p-to-p'],
                    series: [],
                },
                // 柱状图配置
                catagoryOptionsDefault: {
                    xAxis: {
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [],
                        type: 'bar'
                    }]
                }
            }
        },
        mounted() {
            // 初始化饼图
            this.pieDomNode = document.getElementById("data-pie");
            this.pieInstance = echarts.init(this.pieDomNode);
            console.log(this.pieInstance);
            this.pieOptionsDefault.series[0].data=this.pieData;
            this.pieInstance.setOption(this.pieOptionsDefault);

            // 初始化柱形图
            this.cataDomNode = document.getElementById("data-catagory");
            console.log(this.cataDomNode);
            this.cataInstance = echarts.init(this.cataDomNode);
            console.log(this.cataInstance);
            this.catagoryOptionsDefault.xAxis.data = this.catagoryData.xAxis;
            this.catagoryOptionsDefault.series[0].data = this.catagoryData.series;
            this.cataInstance.setOption(this.catagoryOptionsDefault);
        },
        methods: {
            searchTest() {
                console.log('search!');

                // todo: 确认默认ip和默认端口
                const {src_ip, dst_ip} = this.inputData;
                if (src_ip && dst_ip) {
                   try{
                        axios({
                            method: 'POST',
                            url: '/beginData',
                            data: this.inputData, 
                        }).then(res => {
                            console.log(res)
                            const { status, data } = res;
                            const {pie} = data;
                            // const {data: pieData} = this.pieSeries;

                            // 清空初始数据
                            this.pieData=[];
                            this.catagoryData.series=[];
                            this.catagoryData.xAxis=[];

                            // 监控数据
                            if (status === 200) {
                                Object.keys(pie.details).forEach(key => {
                                    this.pieData.push({
                                        value: pie.details[key]*100,
                                        name: key
                                    });
                                    this.catagoryData.xAxis.push(key);
                                    this.catagoryData.series.push(pie.details[key]*pie.total)
                                });

                                console.log('获得的饼/柱状图数据',this.pieData, this.catagoryData);
                                this.pieOptionsDefault.series[0].data = this.pieData;
                                this.pieInstance.setOption(this.pieOptionsDefault);
                                this.catagoryOptionsDefault.xAxis.data = this.catagoryData.xAxis;
                                this.catagoryOptionsDefault.series[0].data = this.catagoryData.series;
                                this.cataInstance.setOption(this.catagoryOptionsDefault);
                            }
                        })
                    } catch(e) {
                        new Throw('查询ip流量失败');
                    }
                }else{ 
                    alert("请输入源ip和目标ip")
                }
                
            }
        }

    }


</script>
