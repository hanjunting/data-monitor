import Mock from 'mockjs'

// src_ip: '10.3.8.211', 
// dst_ip: '112.5.4.432',
// src_port: '3000',
// dst_port: '8009',
// proto_type: 'TCP'

// 获取网络流量监控数据
const searchData = {

        pie: {
            details: {
                chart: 0.56,
                streaming: 0.22,
                ptop: 0.32,
            },
            total: 1000,
        },
        records: [{
            Index: 1,
            src_ip: '10.3.8.211', 
            dst_ip: '112.5.4.432',
            src_port: '3000',
            dst_port: '8333',
            proto_type: 'TCP',
            classification: 'aaa',
            time: new Date().getTime(),
        }]
}
Mock.mock('/beginData', 'post', searchData);