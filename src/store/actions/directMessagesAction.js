import { getItems } from './indexedDBAction';

const dbName = 'DirectMessages';

const directMessagesAction = {

    async getDirectMessages({ commit }) {
        const directMessage = await getItems(dbName);

        commit('SET_DIRECT_MESSAGES', directMessage);
    },

    addDirectMessage({ dispatch }, directMessage) {
        dispatch('addDb', {
            dbName,
            ...directMessage,
        });

        dispatch('getDirectMessages');
    },

    deleteDirectMessage({ dispatch }, directMessage) {
        dispatch('deleteDb', {
            dbName,
            id: directMessage.id
        });

        dispatch('getDirectMessages');
    },

    updateDirectMessage({ dispatch }, directMessage) {
        dispatch('updateDb', {
            dbName,
            ...directMessage,
        });

        dispatch('getDirectMessages');
    },
}

export default directMessagesAction