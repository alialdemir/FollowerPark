let dbReq;

export function getItems(dbName) {
    return new Promise((resolve) => {
        const store = window
            .db
            .transaction([dbName], "readwrite")
            .objectStore(dbName);

        const keyRange = IDBKeyRange.lowerBound(0);
        const cursorRequest = store.openCursor(keyRange);

        const items = [];

        cursorRequest.onsuccess = function(e) {
            const result = e.target.result;
            if (!!result == false) {
                resolve(items.reverse());

                return;
            }

            items.push({
                ...result.value,
                id: result.key
            })

            result.continue();
        };
    });
};

const indexedDBAction = {

    initDatabase() {
        dbReq = indexedDB.open('FollowersPark', 2);
        dbReq.onupgradeneeded = function(event) {
            window.db = event.target.result;

            if (!window.db.objectStoreNames.contains('Tasks')) {
                window.db.createObjectStore('Tasks', { autoIncrement: true });
            }

            if (!window.db.objectStoreNames.contains('Logs')) {
                const objectStore = window.db.createObjectStore('Logs', { keyPath: "id", autoIncrement: true });
                objectStore.createIndex("taskId", "id", { unique: false });
            }

            if (!window.db.objectStoreNames.contains('UserLists')) {
                window.db.createObjectStore('UserLists', { autoIncrement: true });
            }

            if (!window.db.objectStoreNames.contains('DirectMessages')) {
                window.db.createObjectStore('DirectMessages', { autoIncrement: true });
            }

        }

        dbReq.onsuccess = (event) => window.db = event.target.result;
        dbReq.onerror = (event) => console.log('error opening database ' + event.target.errorCode);
    },

    addDb({}, item) {
        let tx = window.db.transaction([item.dbName], 'readwrite');
        let store = tx.objectStore(item.dbName);

        delete item.dbName;
        delete item.id;

        store.add(item);

        tx.onerror = (event) => console.log('error storing note ' + event.target.errorCode);
    },

    updateDb({}, item) {
        const trans = window.db.transaction([item.dbName], "readwrite");
        const store = trans.objectStore(item.dbName);

        delete item.dbName;

        store.put({...item }, item.id);
    },

    deleteDb({}, item) {
        window.db
            .transaction([item.dbName], "readwrite")
            .objectStore(item.dbName)
            .delete(item.id);
    },



}

export default indexedDBAction