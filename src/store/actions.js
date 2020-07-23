/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import currentUserAction from './actions/currentUserAction';
import indexedDBAction from './actions/indexedDBAction';
import logAction from './actions/logAction';
import userListAction from './actions/userListAction';
import blockListAction from './actions/blockListAction';
import taskDBAction from './actions/taskDBAction';
import directMessagesAction from './actions/directMessagesAction';
import taskConfigurationAction from './actions/taskConfigurationAction';
import taskDirectMessagesAction from './actions/taskDirectMessagesAction';
import taskFollowAction from './actions/taskFollowAction';
import taskUnfollowAction from './actions/taskUnfollowAction';

const actions = {
    ...currentUserAction,
    ...indexedDBAction,
    ...logAction,
    ...userListAction,
    ...blockListAction,
    ...taskDBAction,
    ...directMessagesAction,
    ...taskConfigurationAction,
    ...taskDirectMessagesAction,
    ...taskFollowAction,
    ...taskUnfollowAction,

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({ commit }, width) {
        commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
        commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
        commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({ commit }) {
        commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({ commit }, val) {
        commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({ commit }, payload) {
        commit('UPDATE_USER_INFO', payload)
    },
}

export default actions