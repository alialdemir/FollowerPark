import accountAction from './actions/accountAction';
import blockListAction from './actions/blockListAction';
import currentUserAction from './actions/currentUserAction';
import directMessagesAction from './actions/directMessagesAction';
import georaphicalLocationsSearchActions from './actions/georaphicalLocationsSearchActions';
import logAction from './actions/logAction';
import taskConfigurationAction from './actions/taskConfigurationAction';
import userListAction from './actions/userListAction';
import pricingAction from './actions/pricingAction';

const actions = {
    ...currentUserAction,
    ...logAction,
    ...userListAction,
    ...blockListAction,
    ...directMessagesAction,
    ...taskConfigurationAction,
    ...georaphicalLocationsSearchActions,
    ...accountAction,
    ...pricingAction,

    webpackInvalid({ }) { }, // Console da error basıyordu onu engellemek için ekledim
    webpackWarnings({ }) { }, // Console da error basıyordu onu engellemek için ekledim

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