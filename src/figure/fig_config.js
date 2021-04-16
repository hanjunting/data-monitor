import { formateData } from '../utils/utils.js'
// 数据图相关样式配置在此处修改
export const pie_config_on = {
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
          data: ['chat','streaming','p2p']
      },
    series:[{
      name: '流量类别',
      type: 'pie',
      radius : '65%',
      center: ['50%', '55%'],
      itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: []
    }]
}

export const cata_config_on = {
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
                data: ["chat","streaming","p2p"]
            },
            yAxis: {},
            series: [{
                name: '流量数目',
                type: 'bar',
                data: [5, 20, 36]
            }]
        };
export const pie_config_off = {
   title : {
                        text: '流量类别分布',
                        subtext: '',
                        x:'53%',
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
                            center: ['60%', '55%'],
                            data:[],
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

export const cata_config_off = {
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
}
// 图表默认数据在此处设置
export const pie_data_default_on = [
  {value: 0, name:'chat'},
  {value: 0, name:'streaming'},
  {value: 0, name:'p2p'}
]
export const pie_data_default_off = [
  {value: 0, name:'chat'},
  {value: 0, name:'email'},
  {value: 0, name:'file'},
  {value: 0, name:'p2p'},
  {value: 0, name:'streaming'},
  {value: 0, name:'voip'},
  {value: 0, name:'vpn_chat'},
  {value: 0, name:'vpn_email'},
  {value: 0, name:'vpn_file'},
  {value: 0, name:'vpn_p2p'},
  {value: 0, name:'vpn_streaming'},
  {value: 0, name:'vpn_voip'},
]

export const cata_data_default_on = [
  {value: 125, name:'chat'},
  {value: 70, name:'streaming'},
  {value: 203, name:'p2p'}
]
export const cata_data_default_off = [
  {value: 0, name:'chat'},
  {value: 0, name:'email'},
  {value: 0, name:'file'},
  {value: 0, name:'p2p'},
  {value: 0, name:'streaming'},
  {value: 0, name:'voip'},
  {value: 0, name:'vpn_chat'},
  {value: 0, name:'vpn_email'},
  {value: 0, name:'vpn_file'},
  {value: 0, name:'vpn_p2p'},
  {value: 0, name:'vpn_streaming'},
  {value: 0, name:'vpn_voip'},
]

// 设置数据方法
export const setPieData = (dfconf, data) => {
  dfconf.series[0].data = data;
}

export const setCataData = (dfconf, data) => {
  const {xData, yData} = formateData(data);
  dfconf.xAxis.data = xData;
  dfconf.series[0].data = yData;
}
