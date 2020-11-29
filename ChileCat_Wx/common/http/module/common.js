import http from '@/common/http/interface'

//获取广告
export const getAD = (data) => {
    return http.request({
        url: 'AD/',
		data
    })
}

//分类信息
// export const getcategory = (data) => {
// 	return http.request({
// 	    url: 'AD',
// 		data
// 	})
// }
// 商品列表
export const getScreening = (data) => {
	return http.request({
	    url: 'goods/screening?',
		data
	})
}

//商品详情
export const getProducts = (data) => {
	return http.request({
	    url: 'goods/products',
		data
	})
}

//定位商品数据
export const locateGoods = (data) => {
	return http.request({
	    url: 'goods/locateGoods',
		data
	})
}

//页面配置数据
export const config = (data) => {
	return http.request({
	    url: 'config/',
		data
	})
}
//分类信息
export const h5Class = (data) => {
	return http.request({
	    url: 'goods/h5Class',
	})
}
//获取商铺
export const getShops = (data) => {
	return http.request({
	    url: 'shops/list',
		method: "GET",
		data:data
	})
}
//网点列表筛选
export const shopsType = (data) => {
	return http.request({
	    url: 'shops/listType',
		method: "GET",
		data:data
	})
}
export default {
getAD,
getProducts,
locateGoods,
config,
h5Class,
getScreening,
shopsType
}