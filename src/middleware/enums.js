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
    hashtags: [],
    status: false,
    intervalSpeed: 1,
    postsShortCode: [],
    unfollowOption: 0,
    maximumNumberTransactions: 60,
    numberOfLikesPerUser: 3,
    numberTransactions: 0,
    directMessageSource: 0, // direct message source
    userList: [], // direct message user list
    directMessageId: null,
    isSkipSentMessage: true, // Skip users who have already been sent a message
    isDeleteAfterSendingMessage: false, // Delete after sending the message.
    georaphicalLocations: [], // Geographical location
    interactWithPosts: false, //interact with posts of the last
    interactWithPostsDays: 0 // interact with posts of the last days
}

export const unfollowOption = {
    all: 1,
    mutal: 2,
    onesided: 3,
    listofBlocks: 4
}

export const resource = {
    geographicalLocation: 1,
    hashtag: 2,
    user: 3,
    userList: 4
}