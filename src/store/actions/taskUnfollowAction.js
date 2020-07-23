import {
    taskInterval,
    getObjBywhereUserResource,
    getUserIdByUsername
} from '@/middleware/functions';
import * as InsApi from '@/middleware/InsApi';
import { unfollowOption } from '@/middleware/enums'

const taskUnfollowAction = {

    /**
     * Unfollow tasks
     */
    startUnfollowTaskWithInterval({ commit, dispatch }, taskInfo) {
        let urls = [];

        if (taskInfo.task.unfollowOption === unfollowOption.listofBlocks) {
            urls = taskInfo
                .task
                .userList
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


        const callback = async(item, maximumNumberTransactions) => {
            if (urls.length === 0 && maximumNumberTransactions < taskInfo.task.maximumNumberTransactions) {
                dispatch('nextPage', taskInfo);

                return false;
            }



            const unfollowOptions = taskInfo.task.unfollowOption;
            if (unfollowOptions === unfollowOption.listofBlocks) {
                const userId = await getUserIdByUsername(item.username);
                item.url = InsApi.unfollow(userId);
            } else if (unfollowOptions === unfollowOption.onesided || unfollowOptions === unfollowOption.mutal) {
                const responseType = unfollowOptions === unfollowOption.onesided ?
                    'unFollowOnesided' :
                    'unFollowMutal';

                dispatch('postMessage', {
                    type: 'GET',
                    url: InsApi.getProfileByUsername(item.username),
                    responseType: responseType,
                    responseData: {
                        item,
                        actionId: taskInfo.action.id,
                        taskId: taskInfo.task.id
                    }
                });

                return true;
            }

            dispatch('postMessage', {
                type: 'POST',
                url: item.url,
                responseType: 'addNewLog',
                responseData: {
                    userId: item.id,
                    username: item.username,
                    actionId: taskInfo.action.id,
                    id: taskInfo.task.id
                }
            });

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

    unFollowOnesided({ dispatch }, { item, graphql, actionId, taskId }) {
        const { followed_by_viewer, follows_viewer } = (graphql || {}).user || {};

        if (followed_by_viewer === true && follows_viewer === false) { // ben onu takip ediyorum ama o beni takip etmiyorsa
            dispatch('postMessage', {
                type: 'POST',
                url: item.url,
                responseType: 'addNewLog',
                responseData: {
                    userId: item.id,
                    username: item.username,
                    actionId,
                    taskId
                }
            });
        }
    },

    unFollowMutal({ dispatch }, { item, graphql, actionId, taskId }) {
        const { followed_by_viewer, follows_viewer } = (graphql || {}).user || {};

        if (followed_by_viewer === true && follows_viewer === true) { // Her iki taraf da birbirini takip ediyorsa, takip etmeyi bırak
            dispatch('postMessage', {
                type: 'POST',
                url: item.url,
                responseType: 'addNewLog',
                responseData: {
                    userId: item.id,
                    username: item.username,
                    actionId,
                    taskId
                }
            });
        }
    }
}

export default taskUnfollowAction