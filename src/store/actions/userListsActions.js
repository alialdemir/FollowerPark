import { getItems } from './indexedDBAction';

const dbName = 'UserLists';

const userListsActions = {

    async getUserList({ commit }) {
        const myUserList = await getItems(dbName);

        commit('SET_MY_USER_LIST', myUserList);
    },

    addMyUserList({ dispatch }, myUserList) {
        dispatch('addDb', {
            dbName,
            ...myUserList,
        });

        dispatch('getUserList');
    },

    deleteMyUserList({ dispatch }, myUserList) {
        dispatch('deleteDb', {
            dbName,
            id: myUserList.id
        });

        dispatch('getUserList');
    },

    updateMyUserList({ dispatch }, myUserList) {
        dispatch('updateDb', {
            dbName,
            ...myUserList,
        });

        dispatch('getUserList');
    },
}

export default userListsActions