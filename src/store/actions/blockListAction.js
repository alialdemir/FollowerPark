import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';

const blockListAction = {
    async getBlockList({ commit }) {
        const { data } = await getRequest('/blockList?pageNumber=1&pageSize=9999');
        commit('SET_BLOCK_LIST', data.items);
    },

    async addBlockList({ dispatch }, blockList) {
        const { isSuccess } = await postRequest('/blockList', blockList);
        if (isSuccess) {
            dispatch('getBlockList');
        }
    },

    async deleteBlockList({ dispatch }, blockListId) {
        const { isSuccess } = await deleteRequest(`/blockList/${blockListId}`)
        if (isSuccess) {
            dispatch('getBlockList');
        }
    },

    async updateBlockList({ dispatch }, blockList) {
        const { isSuccess } = await putRequest(`/blockList/${blockList.blockListId}`, blockList);
        if (isSuccess) {
            dispatch('getBlockList');
        }
    },
}

export default blockListAction