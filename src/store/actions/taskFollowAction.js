import { taskInterval, getObjBywhereUserResource } from '@/middleware/functions';
import * as InsApi from '@/middleware/InsApi';
import { resource } from '@/middleware/enums';

const taskFollowAction = {
    /**
     * Follow tasks
     */
    startFollowTaskWithInterval({ commit, dispatch }, taskInfo) {
        let urls = [];
        if (taskInfo.task.resource === resource.geographicalLocation) {
            urls = taskInfo
                .task
                .georaphicalLocations
                .map(username => {
                    return {
                        username
                    }
                });

        } else {
            let userIds = getObjBywhereUserResource(taskInfo, taskInfo.whereUserResource.result, taskInfo.action.id);

            urls = userIds.map((item) => {
                const user = item.owner || item;

                return {
                    id: user.id,
                    username: user.username,
                    url: InsApi[taskInfo.action.function](user.id),
                }
            });
        }

        const callback = (item, maximumNumberTransactions) => {
            /*
                        if (urls.length === 0 && maximumNumberTransactions < taskInfo.task.maximumNumberTransactions) {
                            dispatch('nextPage', {
                                ...taskInfo,
                            });

                            return false;
                        }
            */
            const resources = taskInfo.task.resource;
            if (resources === resource.geographicalLocation) {
                debugger

            } else {
                dispatch('postMessage', {
                    type: 'POST',
                    url: item.url,
                    responseType: 'addNewLog',
                    responseData: {
                        ...item,
                        actionId: taskInfo.action.id,
                        id: taskInfo.task.id
                    }
                });
            }

            return true;
        }

        taskInterval({
            commit,
            dispatch,
            taskInfo,
            urls,
            callback
        });
    },

    nextPage({ dispatch }, { user, task, whereUserResource, action }) {
        const { has_next_page, end_cursor } = ((user || {}).edge_follow || (user || {}).edge_followed_by || {}).page_info || {};
        if (!has_next_page) {
            return;
        }

        let parameter = task[whereUserResource.paremeter];
        if (!parameter) {
            return;
        }

        let url = InsApi[whereUserResource.function](parameter, end_cursor);
        if (url === '') {
            return;
        }

        dispatch('postMessage', {
            type: 'GET',
            responseType: 'startFollowTaskWithInterval',
            responseData: {
                task: task,
                whereUserResource: whereUserResource,
                action: action
            },
            url: url,
        });
    },
}

export default taskFollowAction