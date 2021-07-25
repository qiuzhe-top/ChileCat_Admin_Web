/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import api from '@/api/school_information'

const getDefaultState = () => {
	return {

	}
}

const state = getDefaultState()

const mutations = {

}
const actions = {
	// TpiStart

	// 考勤 获取用户基本信息
	student_information({ commit }, request) {
		return new Promise((resolve, reject) => {
			api.student_information(request).then(response => {
			const {  grade, name, tel, id, username } = response.data
			resolve(response)
			}).catch(error => {
			reject(error)
			})
		})
	},
	// TpiEnd

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}


