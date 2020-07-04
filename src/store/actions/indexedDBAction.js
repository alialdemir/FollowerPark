let dbReq;

const indexedDBAction = {

    initDatabase() {
        dbReq = indexedDB.open('FollowersPark', 2);
        dbReq.onupgradeneeded = function(event) {
            window.db = event.target.result;

            if (!window.db.objectStoreNames.contains('Tasks')) { // if there's no "books" store
                window.db.createObjectStore('Tasks', { autoIncrement: true });
            };

            if (!window.db.objectStoreNames.contains('Logs')) { // if there's no "books" store
                const objectStore = window.db.createObjectStore('Logs', { keyPath: "id", autoIncrement: true });
                objectStore.createIndex("taskId", "taskId", { unique: false });
            };
        }

        dbReq.onsuccess = (event) => window.db = event.target.result;
        dbReq.onerror = (event) => console.log('error opening database ' + event.target.errorCode);
    },

    addNewTask({}, task) {
        let tx = window.db.transaction(['Tasks'], 'readwrite');
        let store = tx.objectStore('Tasks');

        store.add({
            ...task,
            status: 0
        });

        tx.onerror = (event) => console.log('error storing note ' + event.target.errorCode);
    },

    getTask({ commit, dispatch }, { whereUserResources, taskActions }) {
        const trans = window.db.transaction(["Tasks"], "readwrite");
        const store = trans.objectStore("Tasks");

        const keyRange = IDBKeyRange.lowerBound(0);
        const cursorRequest = store.openCursor(keyRange);
        const tasks = [];
        cursorRequest.onsuccess = function(e) {
            const result = e.target.result;
            if (!!result == false) {
                commit('SET_TASK', tasks.reverse());

                setTimeout(() => {
                    const activeTasks = tasks.filter((item) => item.status === 1);
                    for (let i = 0; i < activeTasks.length; i++) {
                        const task = activeTasks[i];

                        dispatch('taskStart', {
                            task,
                            whereUserResources,
                            taskActions
                        });
                    }

                }, 1000);

                return;
            }

            tasks.push({
                ...result.value,
                taskId: result.key
            })

            result.continue();
        };
    },

    updateTask({ commit }, task) {
        const trans = window.db.transaction(["Tasks"], "readwrite");
        const store = trans.objectStore("Tasks");
        store.put({...task }, task.taskId);

        const keyRange = IDBKeyRange.lowerBound(0);
        const cursorRequest = store.openCursor(keyRange);
        const tasks = [];
        cursorRequest.onsuccess = function(e) {
            const result = e.target.result;
            if (!!result == false) {
                commit('SET_TASK', tasks.reverse());
                return;
            }

            tasks.push({
                ...result.value,
                taskId: result.key
            })

            result.continue();
        };
    },

    deleteTask({ commit, dispatch }, taskId) {
        window.db
            .transaction(["Tasks"], "readwrite")
            .objectStore("Tasks")
            .delete(taskId);

        commit('DELETE_TASK', taskId);
        dispatch('deleteLog', taskId);
    }
}

export default indexedDBAction