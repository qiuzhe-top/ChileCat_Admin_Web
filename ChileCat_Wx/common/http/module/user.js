import http from '@/common/http/interface'
export const test = (data) => {
	return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
		url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
		data,
	})
}
//获取验证码
export const getVerify = () => {
	var obj = new Date();
	return http.request({
		url: 'user/getVerify',
		method: "GET",
		dataType: 'json',
		data:{a:1}
	})
}
//验证验证码
export const ifVerify = (data) => {
	return http.request({
		url: 'user/ifVerify',
		method: "POST",
		dataType: 'json',
		data
	})
}
//发送邮件验证
export const sendEmail = (data) => {
	return http.request({
		url: 'user/sendEmail',
		method: "POST",
		dataType: 'json',
		data
	})
}
//登录
export const login = (data) => {
	return http.get('user/auth',data)
}
// export const login = (data) => {
// 	return http.request({
// 		url: 'api/v1/user/auth',
// 		method: "POST",
// 		dataType: 'json',
// 		data,
// 	})
// }
//注册
export const register = (data) => {
	return http.request({
		url: 'user/register',
		method: "POST",
		dataType: 'json',
		data,
	})
}
//获取用户信息
export const GetInformation = (data) => {
	return http.request({
		url: 'user/GetInformation',
		method: "POST",
		dataType: 'json',
		data,
	})
}
//修改密码
export const forget = (data) => {
	return http.request({
		url: 'user/forget',
		method: "POST",
		dataType: 'json',
		data,
	})
}
//获取用户信息
export const getroles = (data) => {
	return http.request({
		url: 'user/roles',
		method: "GET",
		dataType: 'json',
		data,
	})
}
//获取订单
export const getUserOrder = () => {
	return http.request({
		url: 'order/',
		method: "GET",
		dataType: 'json',
	})
}
//购物车接口
export const ShoppingCart = (data) => {
	console.log("接受"+data['method'])
	return http.request({
		url: 'user/ShoppingCart',
		method: data.method,
		data:data.data
	})
}
//提交订单
export const PostOrder = (data) => {
	return http.request({
		url: 'order/',
		method: "POST",
		dataType: 'json',
		data,
	})
}
//提交订单
export const postOrder = (data) => {
	return http.request({
		url: 'order/',
		method: "POST",
		dataType: 'json',
		data,
	})
}
//获取网点的接单数据
export const getBranchesOrder = (data) => {
	return http.request({
		url: 'branches/order',
		method: "GET",
		dataType: 'json',
		data,
	})
}

export const collection = (data) => {
	console.log(data)
	return http.request({
		url: 'user/collection',
		method: data.method,
		data:data.data
	})
}
export default {
	test,
	login,
	register,
	getroles,
	getUserOrder,
	PostOrder,
	getBranchesOrder,
	getVerify,
	sendEmail,
	ifVerify,
	forget,
	GetInformation,
	collection,
	ShoppingCart
}
