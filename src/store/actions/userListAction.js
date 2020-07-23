import { getItems } from './indexedDBAction';
import { Object } from 'core-js';

const dbName = 'UserLists';

const userListAction = {

    async getUserList({ commit }) {
        const myUserList = await getItems(dbName);

        commit('SET_MY_USER_LIST', myUserList);
    },

    addMyUserList({ dispatch }, myUserList) {
        dispatch('addDb', {
            dbName,
            ...Object.assign({}, myUserList),
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
            ...Object.assign({}, myUserList),
        });

        dispatch('getUserList');
    },
}

export default userListAction