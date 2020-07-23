export const whereUserResourceType = {
    followers: 1,
    following: 2,
    likes: 3,
    comment: 4,
}

export const actionType = {
    like: 1,
    follow: 2,
    unfollow: 3,
    comment: 4,
    likeAndFollow: 5,
    direct: 6,
    dataCollection: 7,
    storyWatching: 9
}

export const taskConfigurations = {
    action: 0,
    resource: 0,
    username: '',
    userId: '',
    whereUserResource: 0,
    status: 0,
    intervalSpeed: 1000 * 60, // 60 sec
    postsShortCode: [],
    unfollowOption: 0,
    maximumNumberTransactions: 400,
    numberTransactions: 0,
    directMessageSource: 0, // direct message source
    userList: [], // direct message user list
    directMessage: [],
    isSkipSentMessage: true, // Skip users who have already been sent a message
    isDeleteAfterSendingMessage: false, // Delete after sending the message.
}

export const unfollowOption = {
    all: 1,
    mutal: 2,
    onesided: 3,
    listofBlocks: 4
}