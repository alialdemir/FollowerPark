import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';

const userListAction = {

    async getUserList({ commit }) {
        const { data } = await getRequest('/userlist?pageNumber=1&pageSize=9999');

        commit('SET_MY_USER_LIST', data.items);
    },

    async addMyUserList({ dispatch }, myUserList) {
        const { isSuccess } = await postRequest('/userlist', myUserList);
        if (isSuccess) {
            dispatch('getUserList');
        }
    },

    async deleteMyUserList({ dispatch }, userListId) {
        const { isSuccess } = await deleteRequest(`/userList/${userListId}`)
        if (isSuccess) {
            dispatch('getUserList');
        }
    },

    async updateMyUserList({ dispatch }, myUserList) {
        const { isSuccess } = await putRequest(`/userList/${myUserList.userListId}`, myUserList);
        if (isSuccess) {
            dispatch('getUserList');
        }
    },
}

export default userListAction