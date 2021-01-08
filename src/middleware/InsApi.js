import { whereUserResourceType } from '@/middleware/enums';
const insUrl = 'https://www.instagram.com';

export async function followers(username, after) {
    const userId = await getUserIdByUsername(username);

    const variables = JSON.stringify({
        "id": userId,
        "first": 999,
        "after": after || ''
    });

    return `${insUrl}/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=${variables}`;
}

export async function following(username, after) {
    const userId = await getUserIdByUsername(username);

    const variables = JSON.stringify({
        "id": userId,
        "first": 999,
        "after": after || ''
    });

    return `${insUrl}/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=${variables}`;
}


export async function likes(username, after) {
    const shortcode = await getPotsShortCodeByUsername(whereUserResourceType.likes, username);

    const variables = JSON.stringify({
        "shortcode": shortcode[0], // todo multi support
        "include_reel": true,
        "first": 999,
        "after": after || ''
    });

    return `${insUrl}/graphql/query/?query_hash=d5d763b1e2acf209d62d22d184488e57&variables=${variables}`;
}

export async function comments(username, after) {
    const shortcode = await getPotsShortCodeByUsername(whereUserResourceType.comment, username);

    const variables = JSON.stringify({
        "shortcode": shortcode[0], // todo multi support
        "fetch_comment_count": 999,
        "parent_comment_count": 999,
        "has_threaded_comments": true,
        "after": after || ''
    });

    return `${insUrl}/graphql/query/?query_hash=8061d8ba6866a69b02600d467920ed5c&variables=${variables}`;
}

export function getProfileByUsername(username) {
    return `${insUrl}/${username}/?__a=1`;
}


export function follow(userId) {
    return `${insUrl}/web/friendships/${userId}/follow/`;
}

export function unfollow(userId) {
    return `${insUrl}/web/friendships/${userId}/unfollow/`;
}

export function createGroupThread(userId) {
    return {
        url: `${insUrl.replace('www.', 'i.')}/api/v1/direct_v2/create_group_thread/`,
        data: `recipient_users=%5B%22${userId}%22%5D`
    };
}

export function hideThreads(thread_id) {
    return `${insUrl}/direct_v2/web/threads/${thread_id}/hide/`;
}

export function isDirectMessageIncludeUrl(directMessage, thread_id) {
    let isExitsUrl = directMessage.match(/(https?:\/\/[^ ]*)/);
    if (!isExitsUrl) {
        return undefined;
    }

    isExitsUrl = isExitsUrl[1].split('\n').filter(item => item !== '');
    if (directMessage.length === 0) {
        return undefined;
    }

    var time = new Date().getTime();
    var queryParams = new URLSearchParams({
        "action": "send_item",
        "client_context": "5feafb41-f37e-437e-a63d-" + time,
        "link_text": directMessage,
        "link_urls": JSON.stringify(isExitsUrl),
        "mutation_token": "c10d5b8a-e3ed-4431-97b9-8f9070fc5776",
        "thread_id": thread_id,
    }).toString();

    return {
        url: `${insUrl}/direct_v2/web/threads/broadcast/link/`,
        data: queryParams
    };
}

export function search(text) {
    return `${insUrl}/web/search/topsearch/?context=blended&query=${text}&rank_token=0.17570890531920336&include_reel=true`;
}

export function exploreLocations(pk) {
    return `${insUrl}/explore/locations/${pk}/`
}