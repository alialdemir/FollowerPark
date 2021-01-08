import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';
import main from '@/main.js';

const taskConfigurationAction = {

    taskStart({ commit, dispatch }, task) {
        if (!task || !task.taskId) {
            return;
        }

        const interval = setInterval(async () => {
            if (main.$store.state.AppActiveUser.uid === 0) {
                console.log('Instagram bağlantısı kurulamadı');

                return;
            }

            clearInterval(interval);

            const { status } = await putRequest(`/task/${task.taskId}/Start`);
            if (status === 200) {
                dispatch('postMessage', {
                    type: 'startTask',
                    task
                });

                task.status = true;
                commit('TASK_START', task);
            }
        }, 500);
    },

    async taskStop({ commit, dispatch }, task) {
        const { status } = await putRequest(`/task/${task.taskId}/Stop`);
        if (status === 200) {
            dispatch('postMessage', {
                type: 'stopTask',
                task: { taskId: task.taskId }
            });

            task.status = false;
            commit('TASK_STOP', task);
        }
    },

    async addNewTask({ dispatch }, task) {
        const { status } = await postRequest('/Task', task);

        if (status === 200) {
            dispatch('getTask');
        }
    },

    async getTask({ commit, dispatch }) {
        const { data } = await getRequest('/task?pageNumber=1&pageSize=9999');
        commit('SET_TASK', data.items);


        const activeTasks = ((data || {}).items || []).filter((item) => item.status === true);
        for (let i = 0; i < activeTasks.length; i++) {
            const task = activeTasks[i];

            dispatch('taskStart', task);
        }
    },

    async deleteTask({ commit }, taskId) {
        const { status } = await deleteRequest(`/task/${taskId}`)
        if (status === 200) {
            commit('DELETE_TASK', taskId);
        }
    },

    setTaskConfigurations({ commit }, config) {
        commit('SET_TASK_CONFIGURATIONS', config);
    },

    async updateTask({ commit }, { taskId, numberTransactions }) {
        const { data, status } = await putRequest(`/task/${taskId}`, { numberTransactions });
        if (status === 200) {
            //  dispatc('getTask')
            commit('UPDATE_TASK', data);
        }
    },
}

export default taskConfigurationAction