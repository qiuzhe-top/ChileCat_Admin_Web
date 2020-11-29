function getToken(){
	var data = '4000'
	let a = uni.getStorageSync('token')
	if(a) data = a
	return data
}
export default {
	config: {
		baseUrl: 'http://47.100.95.58:8000/',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: {},
		method: "GET",
		dataType: "json",
		responseType: "text",
		success(res) {
			console.log(res.data)
		},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.header = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': getToken(),
		}
		return new Promise((resolve, reject) => {

			options.complete = (response) => {
				let statusCode = response.statusCode
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					reject(response)
				}
			}
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}
