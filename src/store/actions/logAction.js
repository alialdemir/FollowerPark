import { getItems } from './indexedDBAction';

const dbName = 'Logs';

const logDBAction = {

    addNewLog({ dispatch }, log) {
        dispatch('addDb', {
            dbName,
            ...log,
        });
    },

    async getLog({ commit }, id) {
        const logs = await getItems(dbName);

        commit('SET_LOGS', logs.filter(log => log.id === id).reverse());
    },

    updateLog({ dispatch }, log) {
        dispatch('updateDb', {
            dbName,
            ...log,
        });
    },

    deleteLog({}, id) {
        var range = IDBKeyRange.bound(id, id + "\uffff");
        var trans = window.db.transaction([dbName], "readwrite");
        var store = trans.objectStore(dbName);

        var index = store.index("taskId");
        index.openCursor(range).onsuccess = function(e) {
            var result = e.target.result;
            if (result) {
                store.delete(result.value.id);
            }
        };
    }
}

export default logDBAction