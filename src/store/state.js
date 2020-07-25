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
            description: 'In the selected action, your account will follow the users from the source you specified.',
            disabled: true,
            function: 'follow',
            dispatchActionName: 'startFollowTaskWithInterval'
        },
        {
            id: 3,
            text: 'Unfollow',
            icon: 'UserMinusIcon',
            description: 'In the selected action, your account will leave the users you follow.',
            disabled: true,
            function: 'unfollow',
            dispatchActionName: 'startUnfollowTaskWithInterval'
        },
        {
            id: 6,
            text: 'Direct',
            icon: 'SendIcon',
            description: 'In the selected action, your account will send Direct messages to users received from the source you specified.',
            disabled: true,
            isNewPulse: true
        }, {
            id: 1,
            text: 'Like',
            icon: 'ThumbsUpIcon',
            description: 'Selected transactions in your account, taken from the sources you specify users will like the posts issued.',
            disabled: false
        },
        {
            id: 4,
            text: 'Comment',
            icon: 'MessageCircleIcon',
            description: 'In the selected action, your account will leave a comment under the shares of users taken from the source you specified.',
            disabled: false
        },
        {
            id: 5,
            text: 'Like + Follow',
            icon: 'HeartIcon',
            description: 'In the selected action, your account will like the shares of users taken from the source you specified, and then follow these users.',
            disabled: false
        },
        {
            id: 7,
            text: 'Data collection',
            icon: 'DatabaseIcon',
            description: 'When you choose Data Collection, your account will collect users from the source you specified. You cannot set other promotional tasks at the time of data collection.',
            disabled: false
        },
        {
            id: 8,
            text: 'Story watching',
            icon: 'PlayCircleIcon',
            description: 'When you choose to watch the story, your account will watch the stories of users taken from the source you specified. Once the story is watched, you cannot adjust other promotional tasks.',
            disabled: false
        }
    ],
    resources: [{
            id: 1,
            text: 'Geographical Location',
            icon: 'MapPinIcon',
            disabled: true,
            description: 'Paste the post\'s link from each new location into the appropriate area,each geographic location.Enter the name of the place(city, place, institution) in the search box.'
        },
        {
            id: 2,
            text: 'Hashtag',
            icon: 'HashIcon',
            disabled: false,
            description: 'Enter the hashtag you are interested in. You can enter multiple hashtags.To do so, the list following the rule: each must begin on a new line hashtag.'
        },
        {
            id: 3,
            text: 'User',
            icon: 'UserIcon',
            disabled: true,
            description: 'Specify the username of the user you will use as the source. You can enter multiple usernames.'
        },
        {
            id: 4,
            text: 'User List',
            icon: 'UsersIcon',
            disabled: true,
            description: 'Specify a list of users you want to use as the source. You can enter multiple usernames.To do this, you need to create a new user list.'
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
        description: 'Unfollow all followers.',
        disabled: true
    }, {
        id: 2,
        text: 'Mutual',
        icon: 'ShuffleIcon',
        description: 'If both parties follow each other, unfollow.',
        disabled: true
    }, {
        id: 3,
        text: 'One sided',
        icon: 'UserIcon',
        description: 'I follow the other party but if the other does not follow me.',
        disabled: true
    }, {
        id: 4,
        text: 'List of blocks',
        icon: 'UsersIcon',
        description: 'Remove users on the are blocked list.',
        disabled: true
    }, ],

    directMessageSources: [{
            id: 1,
            text: 'Your Followers',
            icon: 'UserPlusIcon',
            description: 'Sends a message to your followers.',
            disabled: true
        },
        {
            id: 2,
            text: 'User list',
            icon: 'ListIcon',
            description: 'Sends a direct message to users in the user list I created.',
            disabled: true
        },
    ],
    speedTypes: [{
        id: 60000, // One minite
        text: 'SLOW',
        subText: 'VERY SAFE'
    }, {
        id: 30000, // 30 second
        text: 'MIDDLE',
        subText: 'SAFE'
    }, {
        id: 20000, // 20 second
        text: 'FAST',
        subText: 'NORMAL'
    }, {
        id: 10000, // 10 second
        text: 'TO FAST',
        subText: 'SOME DANGEROUS'
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