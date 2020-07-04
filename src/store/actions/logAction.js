const logDBAction = {

    addNewLog({}, log) {
        let tx = window.db.transaction(['Logs'], 'readwrite');
        let store = tx.objectStore('Logs');

        store.add(log);

        tx.onerror = (event) => console.log('error storing note ' + event.target.errorCode);
    },

    getLog({ commit }, taskId) {
        var trans = window.db.transaction(["Logs"], "readwrite");
        var store = trans.objectStore("Logs");

        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);
        var logs = [];
        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;
            if (!!result == false) {
                commit('SET_LOGS', logs.filter(log => log.taskId === taskId).reverse());
                return;
            }

            logs.push({
                ...result.value,
                logId: result.key
            })

            result.continue();
        };
    },

    updateLog({}, log) {
        window.db
            .transaction(['Logs'], "readwrite")
            .objectStore('Logs')
            .put({...log }, log.logId);
    },

    deleteLog({}, taskId) {
        var range = IDBKeyRange.bound(taskId, taskId + "\uffff");
        var trans = window.db.transaction(["Logs"], "readwrite");
        var store = trans.objectStore("Logs");

        var index = store.index("taskId");
        index.openCursor(range).onsuccess = function(e) {
            var result = e.target.result;
            store.delete(result.value.id);
        };
    }
}

export default logDBAction