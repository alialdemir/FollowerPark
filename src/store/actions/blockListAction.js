import { getItems } from './indexedDBAction';

const dbName = 'BlockList';

const blockListAction = {

    async getBlockList({ commit }) {
        const myUserList = await getItems(dbName);

        commit('SET_BLOCK_LIST', myUserList);
    },

    addBlockList({ dispatch }, myUserList) {
        dispatch('addDb', {
            dbName,
            ...Object.assign({}, myUserList),
        });

        dispatch('getBlockList');
    },

    deleteBlockList({ dispatch }, myUserList) {
        dispatch('deleteDb', {
            dbName,
            id: myUserList.id
        });

        dispatch('getBlockList');
    },

    updateBlockList({ dispatch }, myUserList) {
        dispatch('updateDb', {
            dbName,
            ...Object.assign({}, myUserList),
        });

        dispatch('getBlockList');
    },
}

export default blockListAction