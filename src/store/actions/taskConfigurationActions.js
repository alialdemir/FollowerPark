import * as InsApi from '@/middleware/InsApi';
import { actionType, whereUserResourceType } from '@/middleware/enums';

const getPostsShortCode = (whereUserResourceId, user) => {
    switch (whereUserResourceId) {
        case whereUserResourceType.likes:
            return (user.edge_owner_to_timeline_media || {}).edges.filter((item) => item.node.edge_liked_by.count > 0).map((item) => item.node.shortcode);

        case whereUserResourceType.comment:
            return (user.edge_owner_to_timeline_media || {}).edges.filter((item) => item.node.edge_media_to_comment.count > 0).map((item) => item.node.shortcode);

        default:
            return [];
    }
}

const getObjBywhereUserResource = (item, resultObject, actionId) => {
    let resultObjectKeys = resultObject.object.split('.');
    let result = null;

    for (let i = 0; i < resultObjectKeys.length; i++) {
        const element = resultObjectKeys[i];

        if (result === null) {
            result = item[element];
        } else if (Array.isArray(result)) {
            result = result
                .filter((item) => {
                    if (!item.node || !item.node.followed_by_viewer) {
                        return true;
                    }

                    const isUnfollow = actionId === actionType.unfollow;
                    return (item.node || {}).followed_by_viewer === isUnfollow;
                })
                .map(item => {
                    let resultObj = {};
                    const newItem = item.node || item;
                    const keys = Object.keys(newItem);

                    for (let j = 0; j < keys.length; j++) {
                        const element = keys[j];
                        if (resultObject.map.includes(element)) {
                            resultObj[element] = newItem[element];
                        }
                    }

                    return resultObj; // getObjBywhereUserResource(item, { object: element })
                });
        } else {
            result = result[element];
        }
    }

    return result;
}

const taskConfigurationActions = {

    taskStart({ dispatch }, taskInfo) {
        if (!taskInfo || !taskInfo.task.taskId) {
            return;
        }

        const action = taskInfo
            .taskActions
            .filter(item => item.id === taskInfo.task.action)
            .shift();

        const whereUserResource = taskInfo
            .whereUserResources
            .filter(item => item.id === taskInfo.task.whereUserResource)
            .shift();

        let parameter = taskInfo.task[whereUserResource.paremeter];
        if (Array.isArray(parameter)) { // todo multi 
            parameter = parameter[0]
        }

        let url = InsApi[whereUserResource.function](parameter);
        if (url === '') {
            return;
        }

        const task = {
            ...taskInfo.task,
            status: 1,
        };

        dispatch('postMessage', {
            type: 'GET',
            responseType: 'startTaskWithInterval',
            responseData: {
                task: task,
                whereUserResource,
                action,
            },
            url: url,
        });

        dispatch('updateTask', task);
    },

    taskStop({ dispatch, commit }, task) {
        commit('TASK_STOP', task.taskId);

        dispatch('updateTask', {
            ...task,
            status: 0
        });
    },

    setTaskConfigurations({ commit }, config) {
        commit('SET_TASK_CONFIGURATIONS', config);
    },

    nextPage({ dispatch }, { user, task, whereUserResource, action }) {
        const { has_next_page, end_cursor } = ((user || {}).edge_follow || (user || {}).edge_followed_by || {}).page_info || {};
        if (has_next_page === false) {
            return;
        }

        let parameter = task[whereUserResource.paremeter];
        let url = InsApi[whereUserResource.function](parameter, end_cursor);
        if (url === '') {
            return;
        }

        dispatch('postMessage', {
            type: 'GET',
            responseType: 'startTaskWithInterval',
            responseData: {
                task: task,
                whereUserResource: whereUserResource,
                action: action
            },
            url: url,
        });
    },

    startTaskWithInterval({ commit, dispatch }, taskInfo) {
        let userIds = getObjBywhereUserResource(taskInfo, taskInfo.whereUserResource.result, taskInfo.action.id);
        const urls = userIds.map((item) => {
            return {
                ...item,
                url: InsApi[taskInfo.action.function](item.id)
            }
        });

        let maximumNumberTransactions = taskInfo.task.numberTransactions;

        const startFollowByUser = () => {
            const followersCount = urls.length;
            const task = {
                ...taskInfo.task,
                numberTransactions: maximumNumberTransactions + 1
            };

            if (followersCount <= 0 && maximumNumberTransactions < taskInfo.task.maximumNumberTransactions) {
                dispatch('nextPage', {
                    ...taskInfo,
                    ...task
                });
            }

            if (followersCount <= 0 || maximumNumberTransactions >= taskInfo.task.maximumNumberTransactions) {
                commit('TASK_STOP', taskInfo.task.taskId);
                clearInterval(followersInterval);

                return;
            }

            const item = urls.shift();
            if (item !== '') {
                dispatch('postMessage', {
                    type: 'POST',
                    url: item.url,
                    responseType: 'addNewLog',
                    responseData: {
                        ...item,
                        actionId: taskInfo.action.id,
                        taskId: taskInfo.task.taskId
                    }
                });

                dispatch('updateTask', task);
            }
        };

        startFollowByUser();
        const followersInterval = setInterval(startFollowByUser, taskInfo.task.intervalSpeed);

        commit('TASK_START', {
            interval: followersInterval,
            taskId: taskInfo.task.taskId

        });
    },

    async followByUserResource({ dispatch }, { username, whereUserResourceId }) {
        if (!username) {
            return;
        }

        const url = InsApi.getProfileByUsername(username);
        const response = await fetch(url);
        const data = await response.json();

        const user = (((data || {}).graphql || {}).user || {});
        const userId = user.id;
        if (!userId) {
            return;
        }

        dispatch('setTaskConfigurations', {
            userId,
            postsShortCode: getPostsShortCode(whereUserResourceId, user)
        });
    },
}

export default taskConfigurationActions