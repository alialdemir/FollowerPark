const actionType = {
    like: 1,
    follow: 2,
    unfollow: 3,
    comment: 4,
    likeAndFollow: 5,
    direct: 6,
    dataCollection: 7,
    storyWatching: 9
}

const resourceType = {
    geographicalLocation: 1,
    hashtag: 2,
    user: 3,
    userList: 4
}

const whereUserResourceType = {
    followers: 1,
    following: 2,
    likes: 3,
    comment: 4,
}

const unfollowOptions = {
    all: 1,
    mutal: 2,
    onesided: 3,
    listofBlocks: 4
}

const directMessageSourceType = {
    followers: 1,
    userList: 2
}
const speedTypes = [
    {
        id: 1,
        speed: 60000, // One minite
    },
    {
        id: 2,
        speed: 30000, // 30 second
    },
    {
        id: 3,
        speed: 20000, // 20 second
    },
    {
        id: 4,
        speed: 10000, // 10 second
    }
];

const postMessage = (message) => {
    window.parent.postMessage(message, '*');
}

class apiRequest {

    getRequest(url) {
        return this.request(url, null, 'get')
    }

    postRequest(url, data) {
        return this.request(url, data, 'post')
    }

    postFormUrlencodedRequest(url, data) {
        return this.request(url, data, 'post', 'application/x-www-form-urlencoded')
    }

    putRequest(url, data) {
        return this.request(url, data, 'put')
    }

    deleteRequest(url) {
        return this.request(url, null, 'delete')
    }

    getCookie(name) {
        const parts = ('; ' + document.cookie).split('; ' + name + '=');
        if (parts.length === 2)
            return parts.pop().split(';').shift();
    }

    async request(url, data, method, contentType) {
        try {
            const response = await fetch(url, {
                headers: {
                    'x-csrftoken': this.getCookie('csrftoken'),
                    'content-type': contentType || 'application/json',
                    'x-ig-app-id': '936619743392459',
                },
                method: method,
                mode: 'cors',
                credentials: 'include',
                body: data || null,
            });

            let json = {};
            try {
                json = await response.json();
            } catch (error) { }

            return {
                ...json,
                isSuccess: response.status === 200
            }
        } catch (error) {
            console.log('Http error', error)
            return { isSuccess: false }
        }
    }
}

class insApi extends apiRequest {

    get insUrl() {
        return 'https://www.instagram.com';
    }

    get insUrlI() {
        return this.insUrl.replace('www.', 'i.');
    }

    constructor() {
        super();
    }

    async followers(userId, after) {
        const variables = JSON.stringify({
            "id": userId,
            "first": 999,
            "after": after || ''
        });

        const url = `${this.insUrl}/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=${variables}`;

        const response = await this.getRequest(url);
        if (!response.isSuccess) {
            return [];
        }

        return ((((response || {}).data || {}).user || {}).edge_followed_by || {}).edges.map(item => {
            return {
                id: item.node.id,
                username: item.node.username,

            };
        });
    }

    async following(userId, after) {
        const variables = JSON.stringify({
            "id": userId,
            "first": 999,
            "after": after || ''
        });

        const url = `${this.insUrl}/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=${variables}`;

        const response = await this.getRequest(url);
        if (!response.isSuccess) {
            return [];
        }

        return ((((response || {}).data || {}).user || {}).edge_follow || {}).edges.map(item => {
            return {
                id: item.node.id,
                username: item.node.username,

            };
        });
    }


    getProfileByUsername(username) {
        return this.getRequest(`${this.insUrl}/${username}/?__a=1`);
    }

    async getFollowStatusByUsername(username) {
        const { graphql } = await this.getProfileByUsername(username);

        const { user } = graphql;

        return {
            followed_by_viewer: (user || {}).followed_by_viewer || false,// benim onu takip etme durumu
            follows_viewer: (user || {}).follows_viewer || false,// onun beni takip etme durumu
            userId: (user || '').id || ''
        }

    }

    async getUserIdByUsername(username) {
        const { graphql, isSuccess } = await this.getProfileByUsername(username);
        if (!isSuccess) {
            return '';
        }

        return ((graphql || {}).user || {}).id || '';
    }

    async follow(userId) {
        const { isSuccess } = await this.postRequest(`${this.insUrl}/web/friendships/${userId}/follow/`);

        return isSuccess;
    }

    async unfollow(userId) {
        const { isSuccess } = await this.postRequest(`${this.insUrl}/web/friendships/${userId}/unfollow/`);

        return isSuccess;
    }

    async like(postId) {
        const { isSuccess } = await this.postRequest(`${this.insUrl}/web/likes/${postId}/like/`);

        return isSuccess;
    }

    async likes(username, after) {
        const shortcodes = await this.getLikesShortcode(username);
        if (shortcodes.length === 0) {
            return [];
        }

        const variables = JSON.stringify({
            "shortcode": shortcodes[0], // todo multi support
            "include_reel": true,
            "first": 999,
            "after": after || ''
        });

        const { data, isSuccess } = await this.getRequest(`${this.insUrl}/graphql/query/?query_hash=d5d763b1e2acf209d62d22d184488e57&variables=${variables}`);
        if (!isSuccess) {
            return [];
        }

        return ((((data || {}).shortcode_media || {}).edge_liked_by || {}).edges || []).map(item => item.node.reel.owner.id);
    }

    async comments(username, after) {
        const shortcodes = await this.getCommentsShortcode(username, whereUserResourceType.comment);
        if (shortcodes.length === 0) {
            return [];
        }

        const variables = JSON.stringify({
            "shortcode": shortcodes[0], // todo multi support
            "fetch_comment_count": 999,
            "parent_comment_count": 999,
            "has_threaded_comments": true,
            "after": after || ''
        });

        const { data, isSuccess } = await this.getRequest(`${this.insUrl}/graphql/query/?query_hash=8061d8ba6866a69b02600d467920ed5c&variables=${variables}`);
        if (!isSuccess) {
            return [];
        }

        return ((((data || {}).shortcode_media || {}).edge_media_preview_comment || {}).edges || [])
            .filter(item => item.node.owner.username !== username)
            .map(item => item.node.owner.id);
    }

    async getLikesShortcode(username) {
        const { graphql, isSuccess } = await this.getProfileByUsername(username);
        if (!isSuccess) {
            return [];
        }

        return ((((graphql || {}).user || {}).edge_owner_to_timeline_media || {}).edges || [])
            .filter((item) => item.node.edge_liked_by.count > 0)
            .map((item) => item.node.shortcode);
    }

    async getCommentsShortcode(username) {
        const { graphql, isSuccess } = await this.getProfileByUsername(username);
        if (!isSuccess) {
            return [];
        }

        return ((((graphql || {}).user || {}).edge_owner_to_timeline_media || {}).edges || [])
            .filter((item) => item.node.edge_media_to_comment.count > 0)
            .map((item) => item.node.shortcode);
    }

    async exploreLocations(pk) {
        const { graphql, isSuccess } = await this.getRequest(`${this.insUrl}/explore/locations/${pk}/?__a=1`);
        if (!isSuccess) {
            return [];
        }

        return ((((graphql || {}).location || {}).edge_location_to_top_posts || {}).edges || []).map(item => {
            return {
                id: item.node.owner.id,
            }
        });
    }

    async exploreHashtag(pk) {
        const { graphql, isSuccess } = await this.getRequest(`${this.insUrl}/explore/tags/${pk}/?__a=1`);
        if (!isSuccess) {
            return [];
        }

        return ((((graphql || {}).hashtag || {}).edge_hashtag_to_top_posts || {}).edges || []).map(item => {
            return {
                id: item.node.owner.id,
            }
        });
    }

    async createGroupThread(userId) {
        const { thread_id, items } = await this.postFormUrlencodedRequest(`${this.insUrlI}/api/v1/direct_v2/create_group_thread/`, `recipient_users=%5B%22${userId}%22%5D`);

        return {
            thread_id: thread_id || '',
            items: items || []
        };
    }

    async isDirectMessageIncludeUrl(directMessage, thread_id, linkUrls) {
        const time = new Date().getTime();
        const queryParams = new URLSearchParams({
            "action": "send_item",
            "client_context": "5feafb41-f37e-437e-a63d-" + time,
            "link_text": directMessage,
            "link_urls": JSON.stringify(linkUrls),
            "mutation_token": "c10d5b8a-e3ed-4431-97b9-8f9070fc5776",
            "thread_id": thread_id,
        }).toString();

        return this.postFormUrlencodedRequest(`${this.insUrlI}/api/v1/direct_v2/threads/broadcast/link/`, queryParams);
    }

    hideThreads(threadId) {
        return this.postFormUrlencodedRequest(`${this.insUrlI}/api/v1/direct_v2/threads/${threadId}/hide/`);
    }
}

class taskBuilder {
    start(task) {
        switch (task.action) {
            case actionType.follow:
                new taskFollow(task);
                break;

            case actionType.unfollow:
                new taskUnfollow(task);
                break;

            case actionType.direct:
                new taskDirectMessage(task);
                break;
        }
    }
}

class taskInterval {

    static _runningTasksInterval = [];

    static get runningTasksInterval() {
        return this._runningTasksInterval;
    }

    static set runningTasksInterval(value) {
        this._runningTasksInterval = value;
    }

    static start(task, urls, callback) {
        const taskIntervalIndex = taskInterval.runningTasksInterval.findIndex((item) => item.taskId === taskId);
        if (taskIntervalIndex !== -1) {
            console.log('Task is running.');

            return;
        }

        let maximumNumberTransactions = task.numberTransactions;

        async function taskLoopFunction() {
            maximumNumberTransactions += 1;

            const item = urls.shift();
            if (!item) {
                console.log('Task is item null.');

                return;
            }

            const isSuccess = await callback(item);
            if (isSuccess) {
                console.log(`${item.username} - ${item.id} action ${task.action} task ${task.taskId}`);

                taskInterval.log({
                    status: task.status,
                    taskId: task.taskId,
                    instagramUserId: item.id,
                    instagramUserName: item.username,
                    actionId: task.action
                });

                taskInterval.increaseNumberTransactions(task.taskId, maximumNumberTransactions);
            }

            if (urls.length <= 0 || maximumNumberTransactions >= task.maximumNumberTransactions) {
                taskInterval.stop(task.taskId);
            }
        }

        console.log(`${task.taskId} id mission was started.`);

        const intervalSpeed = speedTypes.filter(x => x.id === task.intervalSpeed)[0].speed;

        taskLoopFunction();
        const interval = setInterval(taskLoopFunction, intervalSpeed);


        taskInterval.setInterval(interval, task.taskId);
    }

    static log(log) {
        postMessage({
            type: 'addNewLog',
            data: log
        });
    }

    static increaseNumberTransactions(taskId, numberTransactions) {
        postMessage({
            type: 'updateTask',
            data: {
                taskId,
                numberTransactions
            }
        });
    }

    static setInterval(interval, taskId) {
        this.runningTasksInterval.push({
            interval,
            taskId
        });
    }

    static stop(taskId) {
        const interval = taskInterval.runningTasksInterval.filter((item) => item.taskId === taskId)[0];
        if (interval) {
            clearInterval(interval.interval);

            this.runningTasksInterval.splice(interval, 1);

            console.log(`${taskId} task id stopped.`);
        }
    }
}

class taskFollow {
    constructor(task) {
        switch (task.resource) {
            case resourceType.geographicalLocation:
                new taskFollowGeographicalLocation(task);
                break;

            case resourceType.hashtag:
                new taskFollowHashtag(task);
                break;

            case resourceType.user:
            case resourceType.userList:
                new taskFollowUserList(task);
                break;
        }
    }
}

class taskFollowGeographicalLocation extends insApi {

    constructor(task) {
        super();

        this.init(task);
    }

    async init(task) {
        const urls = await this.exploreLocations(task.georaphicalLocations[0]);// TODO: burada multiple işlem yapılmalı

        //TODO: zaten takip ettiğim kullanıcı atlama eklenecek

        taskInterval.start(task, urls, ({ id }) => {
            this.follow(id);

            return true;
        });
    }
}


class taskFollowHashtag extends insApi {

    constructor(task) {
        super();

        this.init(task);
    }

    async init(task) {
        const urls = await this.exploreHashtag(task.hashtags[0]);// TODO: burada multiple işlem yapılmalı

        //TODO: zaten takip ettiğim kullanıcı atlama eklenecek

        taskInterval.start(task, urls, ({ id }) => {
            this.follow(id);

            return true;
        });
    }
}

class taskFollowUserList extends insApi {

    constructor(task) {
        super();

        this.init(task);
    }

    async init(task) {
        let { followed_by_viewer, userId } = await this.getFollowStatusByUsername(task.userList[0]);

        if (userId == '' || followed_by_viewer === true) {// takip etmişse atla
            console.log(`${userId} Takip edilenmiş.`);
            return;
        }

        let urls = [];

        switch (task.whereUserResource) {
            case whereUserResourceType.followers:
                urls = await this.followers(userId);
                break;

            case whereUserResourceType.following:
                urls = await this.following(userId);
                break;

            case whereUserResourceType.likes:
                urls = await this.likes(task.userList[0]);
                break;

            case whereUserResourceType.comment:
                urls = await this.comments(task.userList[0]);
                break;
        }

        taskInterval.start(task, urls, ({ id }) => {
            this.follow(id);

            return true;
        });
    }
}

class taskUnfollow extends insApi {
    constructor(task) {
        super();

        this.init(task);
    }

    async init(task) {
        const userId = await this.getUserIdByUsername(task.username);
        if (userId == '') {
            return;
        }

        let urls = [];

        switch (task.unfollowOption) {
            case unfollowOptions.all:
            case unfollowOptions.mutal:
            case unfollowOptions.onesided:
                urls = await this.following(userId);
                break;

            case unfollowOptions.listofBlocks:
                urls = task.userList.map(username => {
                    return {
                        username
                    }
                });
                break;
        }

        taskInterval.start(task, urls, (userId) => this.unfollowByUserId(task.unfollowOption, userId));
    }

    async unfollowByUserId(unfollowOption, { id, username }) {
        switch (unfollowOption) {
            case unfollowOptions.all:
                this.unfollow(id);
                break;

            case unfollowOptions.mutal:
                let response1 = await this.getFollowStatusByUsername(username);
                if (response1.followed_by_viewer === true && response1.follows_viewer === true) { // Her iki taraf da birbirini takip ediyorsa, takip etmeyi bırak
                    this.unfollow(id);
                }
            case unfollowOptions.onesided:
                let response2 = await this.getFollowStatusByUsername(username);
                if (response2.followed_by_viewer === true && response2.follows_viewer === false) { // ben onu takip ediyorum ama o beni takip etmiyorsa
                    this.unfollow(id);
                }
                break;

            case unfollowOptions.listofBlocks:
                this.unfollowUserList(username);
                break;
        }

        return true;
    }

    async unfollowUserList(username) {
        let { followed_by_viewer, userId } = await this.getFollowStatusByUsername(username);
        if (userId == '' || followed_by_viewer === false) {
            return;
        }

        this.unfollow(userId);
    }
}

class taskDirectMessage extends insApi {
    constructor(task) {
        super();

        this.init(task);
    }

    async init(task) {
        let urls = [];

        switch (task.directMessageSource) {
            case directMessageSourceType.followers:
                const userId = await this.getUserIdByUsername(task.username);
                if (userId == '') {
                    break;
                }

                urls = await this.followers(userId);
                break;

            case directMessageSourceType.userList:
                urls = task.userList.map(username => {
                    return {
                        username
                    }
                });
                break;
        }

        taskInterval.start(task, urls, (userId) => this.sendDirectMessage(task.directMessages, task.isSkipSentMessage, task.isDeleteAfterSendingMessage, userId));
    }

    async sendDirectMessage(directMessages, isSkipSentMessage, isDeleteAfterSendingMessage, user) {
        const message = this.getRandomMessage(directMessages);
        if (message === '') {
            return false;
        }

        const userId = await this.getUserIdByUsername(user.username);// '2111701772'
        if (userId == '') {
            return false;
        }

        const { thread_id, items } = await this.createGroupThread(userId);
        if (!thread_id || isSkipSentMessage === true && this.isSkipSentMessage(directMessages, items)) { // Skip users who have already been sent a message
            return false;
        }

        const isMessageExistsUrl = this.isMessageExistsUrl(message);
        if (isMessageExistsUrl) {// send dm with url
            this.isDirectMessageIncludeUrl(message, thread_id, isMessageExistsUrl);
        } else {// send dm only text
            __mqtt.sendTextMessage(thread_id, message);
        }

        if (isDeleteAfterSendingMessage === true) { // Delete after sending the message
            this.hideThreads(thread_id);
        }

        return true;
    }

    /**
     * Mesajın içinde url var mı kontrol eder varsa true yoksa false
     */
    isMessageExistsUrl(directMessage) {
        let isExitsUrl = directMessage.match(/(https?:\/\/[^ ]*)/);
        if (!isExitsUrl) {
            return undefined;
        }

        isExitsUrl = isExitsUrl[1].split('\n').filter(item => item !== '');
        if (directMessage.length > 0) {
            return isExitsUrl;
        }

        return undefined;
    }

    /**
     * Daha önce mesaj gönderilmiş mi kontrol eder
     */
    isSkipSentMessage(directMessages, items) {
        if (!items || (items || []).length === 0) {
            return false;
        }

        const isExistsMessage = items.some(item =>
            directMessages.some(message =>
                (item.item_type === 'text' && item.text == message.text) ||
                (item.item_type === 'link' && item.link.text == message.text)
            )
        );

        return isExistsMessage;
    }

    getRandomMessage = function (directMessages) {
        if (!directMessages || (directMessages || []).length <= 0) {
            return '';
        }

        return ((directMessages[Math.floor((Math.random() * directMessages.length))] || {}).text || '').trim();
    }
}
/*
new taskBuilder({
    taskId: 1,
    action: actionType.direct,
    resource: resourceType.geographicalLocation,
    whereUserResource: whereUserResourceType.comment,
    intervalSpeed: 1000,// timer hızı
    maximumNumberTransactions: 3,// kaç kere çalışacak
    numberTransactions: 0,// işlem kaç kere gerçekleşti
    userList: ['contestpark'],
    georaphicalLocations: ['212903416'],
    unfollowOption: unfollowOptions.listofBlocks,
    username: 'sda234li',
    directMessageSource: directMessageSourceType.userList,
    isSkipSentMessage: true, // mesaj daha önce gönderilmişse atla
    isDeleteAfterSendingMessage: false, // mesajı gönderdikten sonra silsin mi
    directMessages: [
        {
            id: 'abc1',
            text: 'Hi! 1 https://www.instagram.com/direct/inbox/'
        },
        {
            id: 'abc2',
            text: 'Hi! https://www.instagram.com/direct/inbox/ 2'
        },
        {
            id: 'abc3',
            text: 'Hi! https://www.instagram.com/direct/inbox/ 3'
        }
    ]
});
*/

const taskBuild = new taskBuilder();
postMessage({
    type: 'scu',
    data: ((window || {})._sharedData || {}).config || {},
});

window.addEventListener('message', async (event) => {
    const data = (event || {}).data || {};
    const { type, task } = data;

    if (type === 'startTask') {
        taskBuild.start(task);
    } else if (type === 'stopTask') {
        taskInterval.stop(task.taskId);
    }
});