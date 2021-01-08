import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';

const userListAction = {

    async getUserList({ commit }) {
        const { data } = await getRequest('/userlist?pageNumber=1&pageSize=9999');

        commit('SET_MY_USER_LIST', data.items);
    },

    async addMyUserList({ dispatch }, myUserList) {
        const { status } = await postRequest('/userlist', myUserList);
        if (status === 200) {
            dispatch('getUserList');
        }
    },

    async deleteMyUserList({ dispatch }, userListId) {
        const { status } = await deleteRequest(`/userList/${userListId}`)
        if (status === 200) {
            dispatch('getUserList');
        }
    },

    async updateMyUserList({ dispatch }, myUserList) {
        const { status } = await putRequest(`/userList/${myUserList.userListId}`, myUserList);
        if (status === 200) {
            dispatch('getUserList');
        }
    },
}

export default userListAction