import axios from 'axios'

const request = async (url, params={}, method='post') => {
    const res = await axios({
        url,
        method,
        data: params,
    });
    return res;
}

// 拉取IP统计信息（饼图+柱状图）
const getStatData = (params) => {
    return request('/getStatData', params, 'post');
}
// 拉取IP流（表格）
const getIPstream = (params) => {
    return request('/getIPstream', params, 'post');
}
// 停止监控
const stopMonitor = (params) => {
    return request('/stopMonitor', params, 'post');
}
// 重置
const resetMonitor = (params) => {
    return request('/resetMonitor', params, 'post');
}

export {
    getStatData,
    getIPstream,
    stopMonitor,
    resetMonitor,
}