<template>
    <div class="offlinePie">
        <div id="offlinePie" class="" style="width: 100%;height:500px;"></div>
    </div>
</template>

<script>
    // import echarts from 'echarts/lib/echarts';
    const echarts = require("echarts");
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';

    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('offlinePie'));
            this.myChart.setOption({
                    title : {
                        text: '流量类别分布',
                        subtext: '',
                        x:'center',
                        fontSize: 20
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['chat', 'email', 'file', 'p2p', 'streaming', 'voip', 'vpn_chat',
                                'vpn_email', 'vpn_file', 'vpn_p2p', 'vpn_streaming', 'vpn_voip']
                    },
                    series : [
                        {
                            name: '流量类别',
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '45%'],
                            data:[
                              //  {value:this.pieData.beijing, name:'北京'},
                               // {value:this.pieData.shanghai, name:'上海'},
                              //  {value:this.pieData.shenzhen, name:'深圳'},
                              //  {value:this.pieData.hangzhou, name:'杭州'},
                              //  {value:this.pieData.qita, name:'其他'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }

              );
        },
        props: ['pieData'],
        methods: {
          drawPie() {
          this.myChart.setOption({
            series : [
                        {

                            data:[
                                {value:this.pieData.chat, name:'chat'},
                                {value:this.pieData.email, name:'email'},
                                {value:this.pieData.file, name:'file'},
                                {value:this.pieData.p2p, name:'p2p'},
                                {value:this.pieData.streaming, name:'streaming'},
                                {value:this.pieData.voip, name:'voip'},
                                {value:this.pieData.vpn_chat, name:'vpn_chat'},
                                {value:this.pieData.vpn_email, name:'vpn_email'},
                                {value:this.pieData.vpn_file, name:'vpn_file'},
                                {value:this.pieData.vpn_p2p, name:'vpn_p2p'},
                                {value:this.pieData.vpn_streaming, name:'vpn_streaming'},
                                {value:this.pieData.vpn_voip, name:'vpn_voip'}
                            ],

                        }
                    ]
          });
        },
            initData(){

                this.myChart.setOption(option);
            }
        },

        watch: {
            pieData: function (){
                this.drawPie()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .offlinepie{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
