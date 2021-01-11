import { deleteRequest, getRequest, postRequest, putRequest } from '@/axios.js';
import main from '@/main.js';

const taskConfigurationAction = {

    taskStart({ commit, dispatch }, task) {
        if (!task || !task.taskId) {
            return;
        }

        if (main.$store.state.isExtensionInstalled === false) {
            main.$vs.notify({
                title: main.$i18n.t('YouMustInstallTheChromeExtensionToStartTheTask'),
                color: "danger",
                position: "top-center",
            });

            return;
        }

        const interval = setInterval(async () => {
            if (main.$store.state.AppActiveUser.uid === 0) {
                console.log('Instagram bağlantısı kurulamadı');

                return;
            }

            clearInterval(interval);

            const { isSuccess } = await putRequest(`/task/${task.taskId}/Start`);
            if (isSuccess) {
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
        const { isSuccess } = await putRequest(`/task/${task.taskId}/Stop`);
        if (isSuccess) {
            dispatch('postMessage', {
                type: 'stopTask',
                task: { taskId: task.taskId }
            });

            task.status = false;
            commit('TASK_STOP', task);
        }
    },

    async addNewTask({ dispatch }, task) {
        const { isSuccess } = await postRequest('/Task', task);

        if (isSuccess) {
            dispatch('getTask');
        }
    },

    async getTask({ commit, dispatch }) {
        const { data, isSuccess } = await getRequest('/task?pageNumber=1&pageSize=9999');
        if (isSuccess) {
            commit('SET_TASK', data.items);


            const activeTasks = ((data || {}).items || []).filter((item) => item.status === true);
            for (let i = 0; i < activeTasks.length; i++) {
                const task = activeTasks[i];

                dispatch('taskStart', task);
            }
        }
    },

    async deleteTask({ commit }, taskId) {
        const { isSuccess } = await deleteRequest(`/task/${taskId}`)
        if (isSuccess) {
            commit('DELETE_TASK', taskId);
        }
    },

    setTaskConfigurations({ commit }, config) {
        commit('SET_TASK_CONFIGURATIONS', config);
    },

    async updateTask({ commit }, { taskId, numberTransactions }) {
        const { data, isSuccess } = await putRequest(`/task/${taskId}`, { numberTransactions });
        if (isSuccess) {
            //  dispatc('getTask')
            commit('UPDATE_TASK', data);
        }
    },
}

export default taskConfigurationAction