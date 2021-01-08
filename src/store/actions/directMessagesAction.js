import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';

const directMessagesAction = {

    async getDirectMessages({ commit }) {
        const { data } = await getRequest('/DirectMessage?pageNumber=1&pageSize=9999');
        commit('SET_DIRECT_MESSAGES', data.items);
    },

    async addDirectMessage({ dispatch }, directMessage) {
        const { status } = await postRequest('/DirectMessage', directMessage);
        if (status === 200) {
            dispatch('getDirectMessages');
        }
    },

    async deleteDirectMessage({ dispatch }, directMessageId) {
        const { status } = await deleteRequest(`/DirectMessage/${directMessageId}`)
        if (status === 200) {
            dispatch('getDirectMessages');
        }
    },

    async updateDirectMessage({ dispatch }, directMessage) {
        const { status } = await putRequest(`/DirectMessage/${directMessage.directMessageId}`, directMessage);
        if (status === 200) {
            dispatch('getDirectMessages');
        }
    },
}

export default directMessagesAction