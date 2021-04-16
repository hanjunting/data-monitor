import Mock from 'mockjs'

// src_ip: '10.3.8.211',
// dst_ip: '112.5.4.432',
// src_port: '3000',
// dst_port: '8009',
// proto_type: 'TCP'

// 流量统计信息
const statData = {
    details: {
        'chat': 0.56,
        'streaming': 0.22,
        'p2p': 0.32,
    },
    total: 1000,
}
const listData =
    [{
        Index: 1,
        src_ip: '10.3.8.211',
        dst_ip: '112.5.4.432',
        src_port: '3000',
        dst_port: '8333',
        proto_type: 'TCP',
        classification: 'aaa',
    },{
        Index: 2,
        src_ip: '102.111.33.4',
        dst_ip: '192.168.0.1',
        src_port: '8490',
        dst_port: '8000',
        proto_type: 'UDP',
        classification: 'bbb',
    }
]


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
        }]
}
Mock.mock('/getStatData', 'post', statData);
Mock.mock('/getIPstream', 'post',listData);
