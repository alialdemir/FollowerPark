import { whereUserResourceType, actionType } from '@/middleware/enums';
import * as InsApi from '@/middleware/InsApi';

export function getObjBywhereUserResource(item, resultObject, actionId) {
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

                    return resultObj;
                });
        } else {
            result = result[element];
        }
    }

    return result;
}


export function taskInterval({ commit, dispatch, taskInfo, urls, callback }) {
    let maximumNumberTransactions = taskInfo.task.numberTransactions;

    async function taskLoopFunction() {
        maximumNumberTransactions += 1;

        const item = urls.shift();
        if (!item) {
            return;
        }

        const isSuccess = await callback(item, maximumNumberTransactions);
        if (isSuccess) {
            const task = {
                ...taskInfo.task,
                numberTransactions: maximumNumberTransactions
            };

            dispatch('updateTask', task);
        }

        if (urls.length <= 0 || maximumNumberTransactions >= taskInfo.task.maximumNumberTransactions) {
            commit('TASK_STOP', taskInfo.task.id);

            clearInterval(taskInterval);
        }
    }

    taskLoopFunction();
    const taskInterval = setInterval(taskLoopFunction, taskInfo.task.intervalSpeed);

    commit('TASK_START', {
        interval: taskInterval,
        id: taskInfo.task.id
    });
}

async function getProfileByUsername(username) {
    const url = InsApi.getProfileByUsername(username);

    const response = await fetch(url, {
        "method": "GET",
    });
    if (response.status !== 200) {
        return {};
    }

    const data = await response.json();

    return ((data || {}).graphql || {}).user || {};
}

export async function getUserIdByUsername(username) {
    const data = await getProfileByUsername(username);
    const userId = data.id || ''

    return userId;
}

export async function getPotsShortCodeByUsername(whereUserResourceId, username) {
    const user = await getProfileByUsername(username);
    const shortcode = getPostsShortCode(whereUserResourceId, user);

    return shortcode;
}

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