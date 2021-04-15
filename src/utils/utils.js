
export const formateData = (data = []) => {
  const xData = [],
        yData = [];
        console.log('in format',data)
  data.forEach(item => {
    if (item.value === undefined || !item.name) {
      console.log('formate error',item)
    } 
    xData.push(item.name);
    yData.push(item.value);
  });
  return {
    xData,
    yData
  }
}