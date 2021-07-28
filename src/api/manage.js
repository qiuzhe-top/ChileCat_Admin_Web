// TpiStart
/**
 * 系统数据初始化
 * @returns {} null
*/
data_init(data) {
  return request({
    url: '/api/manage/data/init',
    method: 'post',
    data
  })
},
// TpiEnd