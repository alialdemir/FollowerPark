import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';

const directMessagesAction = {

    async getDirectMessages({ commit }) {
        const { data } = await getRequest('/DirectMessage?pageNumber=1&pageSize=9999');
        commit('SET_DIRECT_MESSAGES', data.items);
    },

    async addDirectMessage({ dispatch }, directMessage) {
        const { isSuccess } = await postRequest('/DirectMessage', directMessage);
        if (isSuccess) {
            dispatch('getDirectMessages');
        }
    },

    async deleteDirectMessage({ dispatch }, directMessageId) {
        const { isSuccess } = await deleteRequest(`/DirectMessage/${directMessageId}`)
        if (isSuccess) {
            dispatch('getDirectMessages');
        }
    },

    async updateDirectMessage({ dispatch }, directMessage) {
        const { isSuccess } = await putRequest(`/DirectMessage/${directMessage.directMessageId}`, directMessage);
        if (isSuccess) {
            dispatch('getDirectMessages');
        }
    },
}

export default directMessagesAction