<template>
    <div class="offlineTendency">
        <div id="offlineTendency" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    // import echarts from 'echarts/lib/echarts';
    var echarts = require("echarts");
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('offlineTendency'));
            this.initData();
        },
        props: ['sevenDate', 'sevenDay'],
        methods: {
            initData(){
                const colors = ['#5793f3', '#675bba', '#d14a61'];
                 var option = {
            title: {
                text: '各类别流量数目',
                x: '10%',
                fontSize: 20
            },
            tooltip: {},
            legend: {
                data:['流量数目']
            },
            xAxis: {
                data: ["chat","email","file","p2p","streaming","voip","vpn_chat",
                        "vpn_email","vpn_file","vpn_p2p","vpn_streaming","vpn_voip"]
            },
            yAxis: {},
            series: [{
                name: '流量数目',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
            }]
        };

                this.myChart.setOption(option);
            }
        },
        watch: {
            sevenDate: function (){
                this.initData()
            },
            sevenDay: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .offlineTendency{
        display: flex;
        justify-content: center;
    }
</style>
