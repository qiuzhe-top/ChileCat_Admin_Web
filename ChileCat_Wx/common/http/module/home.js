import http from '@/common/http/interface'

//轮番
export const getTurns = (data) => {
    return http.request({
        url: 'home/getTurns',
		data
    })
}
//快捷通道
export const getQuick = (data) => {
    return http.request({
        url: 'home/quick',
		data
    })
}
//秒杀
export const getKillGoods = (data) =>{
	return http.request({
		url:'home/getGoodsList'
	})
}
//精品商品
export const getSelection = (data) =>{
	return http.request({
		url:'home/getSelection'
	})
}
//热门商品下面
export const getHoustBot = (data) =>{
	return http.request({
		url:'home/getHoustBot'
	})
}



export default {
getTurns,
getQuick,
getKillGoods,
getSelection,
getHoustBot,

}