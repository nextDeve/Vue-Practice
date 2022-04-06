import { reqCategoryList, reqGetBannerlist, reqGetFloorlist } from "@/api";
const state = { category: [], bannerList: [], floorList: [] };
const mutations = {
    CATEGORYLIST(state, category) {
        state.category = category
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
const actions = {
    async CategoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerlist();
        if (result.code = 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqGetFloorlist();
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}