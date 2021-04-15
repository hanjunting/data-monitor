import { formateData } from '../utils/utils.js'
// 数据图相关样式配置在此处修改
export const pie_config = {
    series:[{
      name: '流量饼图',
      type: 'pie',
      radius: [0, 75],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
          borderRadius: 8
      },
      data: []
    }]
}

export const cata_config = {
  xAxis: {
    type: 'category',
    data: ['name1','name2','name3']
  },
  yAxis: {
    type: 'value' 
  },
  series: [{
    data: [],
    type: 'bar'
  }]
}

// 图表默认数据在此处设置
export const pie_data_default = [
  {value: 0, name:'name1'},
  {value: 0, name:'name2'},
  {value: 0, name:'name3'}
]

export const cata_data_default = [
  {value: 0, name:'name1'},
  {value: 0, name:'name2'},
  {value: 0, name:'name3'}
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