import { reqCartList, reqDeletShopCart, reqChangeShopCartState } from "@/api"
const state = { shopcartInfo: [] }
const mutations = {
    GETSHOPCARTINFO(state, shopcartInfo) {
        state.shopcartInfo = shopcartInfo
    }
}
const actions = {
    async getShopCartInfo({ commit }) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit('GETSHOPCARTINFO', result.data)
        }
    },
    async deleteShopCart({ commit }, skuId) {
        let result = await reqDeletShopCart(skuId)
        if (result.code === 200) {
            return 'ok'
        } else return Promise.reject(new Error('error'))
    },
    async ChangeShopCartState({ commit }, { skuId, isChecked }) {
        let result = await reqChangeShopCartState(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else return Promise.reject(new Error('error'))
    }
}
const getters = {
    cartList(state) {
        return state.shopcartInfo[0] || {}
    },
    shopcartInfo(state) {
        if (!state.shopcartInfo[0]) return [];
        else return state.shopcartInfo[0].cartInfoList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}