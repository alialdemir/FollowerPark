/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [{
    url: "/",
    name: "task",
    slug: "Task",
    icon: "CheckSquareIcon",
}, {
    url: null,
    name: "My Lists",
    slug: "My Lists",
    icon: "ListIcon",
    submenu: [{
        url: '/user-lists',
        name: "User Lists",
        slug: "user-lists",
        i18n: "User Lists",
    }, {
        url: '/direct-messages',
        name: "Direct Messages",
        slug: "direct-messages",
        i18n: "Direct Messages",
    }]

}]