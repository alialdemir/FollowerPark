import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';

const logDBAction = {

    addNewLog({ }, log) {
        postRequest('/Log', log);
    },

    async getLog({ commit }, taskId) {
        const { data } = await getRequest(`/Log/Task/${taskId}?pageNumber=1&pageSize=9999`);
        commit('SET_LOGS', data.items);
    },

    updateLog({ }, log) {
        putRequest(`/Log/${log.logId}`, log);
    },

    deleteLog({ }, logId) {
        deleteRequest(`/Log/${logId}`)
    }
}

export default logDBAction