/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [{
    url: "/tasks",
    name: "Tasks",
    slug: "Task",
    i18n: "Tasks",
    icon: "CheckSquareIcon",
}, {
    url: null,
    name: "My Lists",
    slug: "My Lists",
    i18n: "MyLists",
    icon: "ListIcon",
    submenu: [{
        url: '/user-list',
        name: "User Lists",
        slug: "user-list",
        i18n: "UserLists",
    }, {
        url: '/direct-messages',
        name: "Direct Messages",
        slug: "direct-messages",
        i18n: "DirectMessages",
    }, {
        url: '/block-list',
        name: "Block List",
        slug: "block-list",
        i18n: "BlockList",
    }]

}]