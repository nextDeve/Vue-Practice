import { reqAddressList, reqOrderInfo } from "@/api"
let state = {
    adderssList: [],
    orderInfo: {}
}
let mutations = {
    GETUSERADDRESSLIST(state, adderssList) {
        state.adderssList = adderssList
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
let actions = {
    async getUserAddressList({ commit }) {
        let result = await reqAddressList()
        if (result.code === 200) {
            commit('GETUSERADDRESSLIST', result.data)
            return 'ok'
        } else return Promise.reject('获取地址失败')
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code === 200) {
            commit('GETORDERINFO', result.data)
            return 'ok'
        } else return Promise.reject('获取订单信息失败')
    }
}
let getters = {
    detailArrayList(state) {
        return state.orderInfo.detailArrayList || []
    },
    tradeNo(state) {
        return state.orderInfo.tradeNo || ''
    }
}
export default {
    state, mutations, actions, getters
}