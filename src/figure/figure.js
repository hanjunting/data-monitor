import * as echarts from 'echarts'

class Figure {
  constructor(domNode, option) {
    // this.options = {};
    this.option = option;
    this.echartInstance = echarts.init(domNode);
    console.log('node',domNode)
    
  }

  setData(data, op = () => {}) {
    op(this.option, data);
    this.render();
  }

  
  render() {
    this.echartInstance.setOption(this.option);
  }

}

export default Figure;