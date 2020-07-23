import * as InsApi from '@/middleware/InsApi';
import { taskInterval, getUserIdByUsername } from '@/middleware/functions'

const taskDirectMessagesAction = {
    directMessageFollowers({ dispatch }, data) {
        data.userList = ((data.user || {}).edge_followed_by || {}).edges.map(item => item.node.username);

        delete data.user;

        dispatch('startDirectMessageTaskWithInterval', { task: data });
    },

    /**
     * Direct message tasks
     */
    startDirectMessageTaskWithInterval({ commit, dispatch }, taskInfo) {
        let urls = Object.assign([], taskInfo.task.userList);

        const callback = async(username) => {
            const userId = await getUserIdByUsername(username);
            if (userId === '') {
                return;
            }

            const createGroupThreadUrl = InsApi.createGroupThread(userId);

            if (createGroupThreadUrl !== '') {
                dispatch('postMessage', {
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    responseType: 'sendDirectMessageWithThreadsId',
                    responseData: {
                        task: taskInfo.task,
                    },
                    requestData: createGroupThreadUrl.data,
                    url: createGroupThreadUrl.url,
                });

                return true;
            }

            return false;
        }

        taskInterval({
            commit,
            dispatch,
            taskInfo,
            urls,
            callback
        });
    },

    /**
     * Direct message with threads id callback
     */
    sendDirectMessageWithThreadsId({ dispatch }, { thread_id, task, items }) {
        const isExistsMessage = items.some(item =>
            task.directMessage.some(message =>
                (item.item_type === 'text' && item.text == message.text) ||
                (item.item_type === 'link' && item.link.text == message.text)
            )
        );

        if (task.isSkipSentMessage === true && isExistsMessage) { // Skip users who have already been sent a message
            return;
        }

        const directMessage = task.directMessage[Math.floor(Math.random() * task.directMessage.length)].text.trim();
        const isDirectMessageIncludeUrl = InsApi.isDirectMessageIncludeUrl(directMessage, thread_id);
        const logItem = {
            responseType: 'addNewLog',
            responseData: {
                username: task.username,
                directMessage,
                actionId: task.action,
                id: task.id
            }
        };

        if (isDirectMessageIncludeUrl) { // send dm with url
            dispatch('postMessage', {
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                requestData: isDirectMessageIncludeUrl.data,
                url: isDirectMessageIncludeUrl.url,
                ...logItem
            });
        } else {
            dispatch('postMessage', {
                type: 'dm',
                url: '',
                ...logItem
            });
        }

        if (task.isDeleteAfterSendingMessage === true) { // Delete after sending the message
            dispatch('postMessage', {
                url: InsApi.hideThreads(thread_id),
                type: 'POST',
            });
        }
    },
}

export default taskDirectMessagesAction