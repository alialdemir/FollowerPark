import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';

const blockListAction = {
    async getBlockList({ commit }) {
        const { data } = await getRequest('/blockList?pageNumber=1&pageSize=9999');
        commit('SET_BLOCK_LIST', data.items);
    },

    async addBlockList({ dispatch }, blockList) {
        const { status } = await postRequest('/blockList', blockList);
        if (status === 200) {
            dispatch('getBlockList');
        }
    },

    async deleteBlockList({ dispatch }, blockListId) {
        const { status } = await deleteRequest(`/blockList/${blockListId}`)
        if (status === 200) {
            dispatch('getBlockList');
        }
    },

    async updateBlockList({ dispatch }, blockList) {
        const { status } = await putRequest(`/blockList/${blockList.blockListId}`, blockList);
        if (status === 200) {
            dispatch('getBlockList');
        }
    },
}

export default blockListAction