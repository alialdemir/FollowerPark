import * as InsApi from '@/middleware/InsApi';
import { unfollowOption } from '@/middleware/enums'

const taskConfigurationAction = {

    async taskStart({ dispatch }, taskInfo) {
        if (!taskInfo || !taskInfo.task.id) {
            return;
        }

        let url = '';
        let whereUserResource = {};

        const action = taskInfo
            .taskActions
            .filter(item => item.id === taskInfo.task.action)
            .shift();


        if (taskInfo.task.whereUserResource > 0) {
            whereUserResource = taskInfo
                .whereUserResources
                .filter(item => item.id === taskInfo.task.whereUserResource)
                .shift();

            let parameter = taskInfo.task[whereUserResource.paremeter];
            if (Array.isArray(parameter)) { // todo multi support
                parameter = parameter[0]
            }

            url = await InsApi[whereUserResource.function](parameter);
            if (url === '') {
                return;
            }
        }

        const task = {
            ...taskInfo.task,
            status: 1,
        };

        if (task.action === 6) {
            if (task.directMessageSource === 1) {
                dispatch('postMessage', {
                    type: 'GET',
                    responseType: 'directMessageFollowers',
                    responseData: task,
                    url: InsApi.followers(task.userId),
                });

            } else if (task.directMessageSource === 2) {
                dispatch('startDirectMessageTaskWithInterval', { task });
            }
        } else if (task.unfollowOption === unfollowOption.listofBlocks) {
            dispatch(action.dispatchActionName, {
                task,
                whereUserResource,
                action,
            });
        } else {
            dispatch('postMessage', {
                type: 'GET',
                responseType: action.dispatchActionName,
                responseData: {
                    task,
                    whereUserResource,
                    action,
                },
                url: url,
            });
        }

        dispatch('updateTask', task);
    },

    taskStop({ dispatch, commit }, task) {
        commit('TASK_STOP', task.id);

        dispatch('updateTask', {
            ...task,
            status: 0
        });
    },

    setTaskConfigurations({ commit }, config) {
        commit('SET_TASK_CONFIGURATIONS', config);
    },
}

export default taskConfigurationAction