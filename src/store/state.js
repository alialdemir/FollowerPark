import { default as colors, default as themeConfig } from "@/../themeConfig.js";
import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList";
import { taskConfigurations } from '../middleware/enums';


// /////////////////////////////////////////////
// My states
// /////////////////////////////////////////////

const myStates = {
    currentUser: {
        viewer: {
            profile_pic_url: '',
            username: '',
            biography: ''
        }
    },
    taskConfigurations: taskConfigurations,
    tasks: [],
    runningTasksInterval: [],
    logs: [],

    taskActions: [{
            id: 2,
            text: 'Follow',
            icon: 'UserPlusIcon',
            description: 'FollowDescription',
            disabled: true,
            function: 'follow',
            dispatchActionName: 'startFollowTaskWithInterval'
        },
        {
            id: 3,
            text: 'Unfollow',
            icon: 'UserMinusIcon',
            description: 'UnfollowDescription',
            disabled: true,
            function: 'unfollow',
            dispatchActionName: 'startUnfollowTaskWithInterval'
        },
        {
            id: 6,
            text: 'Direct',
            icon: 'SendIcon',
            description: 'DirectDescription',
            disabled: true,
            isNewPulse: true
        }, {
            id: 1,
            text: 'Like',
            icon: 'ThumbsUpIcon',
            description: 'LikeDescription',
            disabled: false
        },
        {
            id: 4,
            text: 'Comment',
            icon: 'MessageCircleIcon',
            description: 'CommentDescription',
            disabled: false
        },
        {
            id: 5,
            text: 'LikeFollow',
            icon: 'HeartIcon',
            description: 'LikeFollowDescription',
            disabled: false
        },
        {
            id: 7,
            text: 'DataCollection',
            icon: 'DatabaseIcon',
            description: 'DataCollectionDescription',
            disabled: false
        },
        {
            id: 8,
            text: 'StoryWatching',
            icon: 'PlayCircleIcon',
            description: 'StoryWatchingDescription',
            disabled: false
        }
    ],
    resources: [{
            id: 1,
            text: 'GeographicalLocation',
            icon: 'MapPinIcon',
            disabled: true,
            description: 'GeographicalLocationDescription'
        },
        {
            id: 2,
            text: 'Hashtag',
            icon: 'HashIcon',
            disabled: false,
            description: 'HashtagDescription'
        },
        {
            id: 3,
            text: 'User',
            icon: 'UserIcon',
            disabled: true,
            description: 'UserDescription'
        },
        {
            id: 4,
            text: 'UserList',
            icon: 'UsersIcon',
            disabled: true,
            description: 'UserListDescription'
        }
    ],
    whereUserResources: [{
            id: 1,
            text: 'Followers',
            icon: 'UserPlusIcon',
            disabled: true,
            function: 'followers',
            paremeter: 'userList',
            result: {
                object: 'user.edge_followed_by.edges.node.id',
                map: ['id', 'username']
            },
        },
        {
            id: 2,
            text: 'Following',
            icon: 'UserCheckIcon',
            disabled: true,
            function: 'following',
            paremeter: 'userList',
            result: {
                object: 'user.edge_follow.edges.node.id',
                map: ['id', 'username']
            }
        },
        {
            id: 3,
            text: 'Likes',
            icon: 'HeartIcon',
            disabled: true,
            function: 'likes',
            paremeter: 'userList',
            result: {
                object: 'shortcode_media.edge_liked_by.edges.node.id',
                map: ['id', 'username']
            }
        },
        {
            id: 4,
            text: 'Comment',
            icon: 'MessageCircleIcon',
            disabled: true,
            function: 'comments',
            paremeter: 'userList',
            result: {
                object: 'shortcode_media.edge_media_to_parent_comment.edges.node.owner',
                map: ['owner']
            }
        }
    ],
    unfollowOptions: [{
        id: 1,
        text: 'All',
        icon: 'UserPlusIcon',
        description: 'AllDescription',
        disabled: true
    }, {
        id: 2,
        text: 'Mutual',
        icon: 'ShuffleIcon',
        description: 'MutualDescription',
        disabled: true
    }, {
        id: 3,
        text: 'OneSided',
        icon: 'UserIcon',
        description: 'OneSidedDescription',
        disabled: true
    }, {
        id: 4,
        text: 'ListOfBlocks',
        icon: 'UsersIcon',
        description: 'ListOfBlocksDescription',
        disabled: true
    }, ],

    directMessageSources: [{
            id: 1,
            text: 'YourFollowers',
            icon: 'UserPlusIcon',
            description: 'Sends a message to your followers.',
            disabled: true
        },
        {
            id: 2,
            text: 'UserList',
            icon: 'ListIcon',
            description: 'Sends a direct message to users in the user list I created.',
            disabled: true
        },
    ],
    speedTypes: [{
        id: 60000, // One minite
        text: 'Slow',
        subText: 'VerySafe'
    }, {
        id: 30000, // 30 second
        text: 'Middle',
        subText: 'Safe'
    }, {
        id: 20000, // 20 second
        text: 'Fast',
        subText: 'Normal'
    }, {
        id: 10000, // 10 second
        text: 'ToFast',
        subText: 'SomeDangerous'
    }],
    // Lists
    myUserLists: [],
    directMessages: [],
    blockList: [],
    searchGeographicalLocation: []
}

// /////////////////////////////////////////////
// Variables
// /////////////////////////////////////////////

const userDefaults = {
    uid: 0, // From Auth
    displayName: "", // From Auth
    username: "", // From Auth
    about: "",
    photoURL: '',
    status: "online",
    userRole: "user"
}

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
    AppActiveUser: userDefaults,
    bodyOverlay: false,
    isVerticalNavMenuActive: true,
    mainLayoutType: themeConfig.mainLayoutType || "vertical",
    navbarSearchAndPinList: navbarSearchAndPinList,
    reduceButton: themeConfig.sidebarCollapsed,
    verticalNavMenuWidth: "default",
    verticalNavMenuItemsMin: false,
    scrollY: 0,
    starredPages: navbarSearchAndPinList["pages"].data.filter((page) => page.is_bookmarked),
    theme: themeConfig.theme || "light",
    themePrimaryColor: colors.primary,

    // Can be used to get current window with
    // Note: Above breakpoint state is for internal use of sidebar & navbar component
    windowWidth: null,

    ////////////////
    ...myStates
}

export default state