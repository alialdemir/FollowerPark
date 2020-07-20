import { getItems } from './indexedDBAction';


const dbName = 'Tasks';

const indexedDBAction = {
    addNewTask({ dispatch }, task) {
        dispatch('addDb', {
            dbName,
            ...task,
            status: 0
        });
    },

    async getTask({ commit, dispatch }, { whereUserResources, taskActions }) {
        const tasks = await getItems(dbName);

        commit('SET_TASK', tasks);

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
    },

    async updateTask({ commit, dispatch }, task) {
        dispatch('updateDb', {
            dbName,
            ...task,
        });

        const tasks = await getItems(dbName);
        commit('SET_TASK', tasks);
    },

    deleteTask({ commit, dispatch }, id) {
        dispatch('deleteDb', {
            dbName,
            id
        });

        commit('DELETE_TASK', id);
        dispatch('deleteLog', id);
    }
}

export default indexedDBAction