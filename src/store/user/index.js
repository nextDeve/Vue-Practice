import { reqGetCode, reqUserRigester, reqUserLogin, reqUserInfo, reqLogOut } from "@/api"
import { setToken, getTOken, removeToken } from '@/utils/token.js'
const state = {
    code: '',
    token: getTOken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        setToken(token)
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEARUSERINFO(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
        } else return Promise.reject(new Error('验证码获取失败'))
    },
    async userRigester({ commit }, data) {
        let result = await reqUserRigester(data)
        if (result.code === 200) {
            return 'ok';
        } else return Promise.reject(new Error('注册失败'))
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code === 200) {
            commit('USERLOGIN', result.data.token)
            return 'ok';
        } else return Promise.reject(result.message)
    },
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else return Promise.reject('获取个人信息失败')
    },
    async userLogOut({ commit }) {
        let result = await reqLogOut()
        if (result.code === 200) {
            commit('CLEARUSERINFO')
            return 'ok'
        } else return Promise.reject('退出登录失败')
    },
}
const getters = {
    userName(state) {
        return state.userInfo.name
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}