const insUrl = 'https://www.instagram.com';

export function followers(userId, after) {
    const variables = JSON.stringify({
        "id": userId,
        "first": 999,
        "after": after || ''
    });

    return `${insUrl}/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=${variables}`;
}

export function following(userId, after) {
    const variables = JSON.stringify({
        "id": userId,
        "first": 999,
        "after": after || ''
    });

    return `${insUrl}/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=${variables}`;
}


export function likes(shortcode, after) {
    const variables = JSON.stringify({
        "shortcode": shortcode,
        "include_reel": true,
        "first": 999,
        "after": after || ''
    });

    return `${insUrl}/graphql/query/?query_hash=d5d763b1e2acf209d62d22d184488e57&variables=${variables}`;
}

export function comments(shortcode, after) {
    const variables = JSON.stringify({
        "shortcode": shortcode,
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
        url: `${insUrl}/direct_v2/web/create_group_thread/`,
        data: `recipient_users=%5B%22${userId}%22%5D`
    };
}