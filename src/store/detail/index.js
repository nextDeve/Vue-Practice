import { reqAddOrUpdateShopCart, reqDetaiIndo } from "@/api";
import { getUUID } from '@/utils/uuid_token'
const state = {
    detaiInfo: {},
    uuid: getUUID()
};
const mutations = {
    GETDETAIINDO(state, detaiInfo) {
        state.detaiInfo = detaiInfo
    }
};
const actions = {
    async getDetaiInfo({ commit }, skuid) {
        let result = await reqDetaiIndo(skuid);
        if (result.code === 200) {
            commit('GETDETAIINDO', result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum, CancelToken }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum, CancelToken)
        if (result.code === 200) {
            return "ok"
        }
        else return Promise.reject(new Error('error'))
    }
};
const getters = {
    categoryView(state) {
        let res = []
        if (!state.detaiInfo.categoryView) return [];
        res.push(state.detaiInfo.categoryView.category1Name)
        res.push(state.detaiInfo.categoryView.category2Name)
        res.push(state.detaiInfo.categoryView.category3Name)
        return res
    },
    skuInfo(state) {
        return state.detaiInfo.skuInfo || {}
    },
    skuAttrList(state) {
        return state.detaiInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}