/*=========================================================================================
  File Name: themeConfig.js
  Description: Theme configuration
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

// MAIN COLORS - VUESAX THEME COLORS
let colors = {
  primary: '255,159,67',
  success: '#28c76f',
  danger: '#ea5455',
  warning: '#ff9f43',
  dark: '#4b4b4b',
}

// CONFIGS
const themeConfig = {
  disableCustomizer: false, // options[Boolean] : true, false(default)
  disableThemeTour: false, // options[Boolean] : true, false(default)
  footerType: "hidden", // options[String]  : static(default) / sticky / hidden
  hideScrollToTop: false, // options[Boolean] : true, false(default)
  mainLayoutType: "horizontal", // options[String]  : vertical(default) / horizontal
  navbarColor: "#fff", // options[String]  : HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
  navbarType: "floating", // options[String]  : floating(default) / static / sticky / hidden
  routerTransition: "zoom-fade", // options[String]  : zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
  rtl: false, // options[Boolean] : true, false(default)
  sidebarCollapsed: false, // options[Boolean] : true, false(default)
  theme: "dark", // options[String]  : "light"(default), "dark", "semi-dark"

  // Not required yet - WIP
  userInfoLocalStorageKey: "userInfo",

  // NOTE: themeTour will be disabled in screens < 1200. Please refer docs for more info.
}

import Vue from 'vue'
import Vuesax from 'vuesax'
Vue.use(Vuesax, { theme: { colors }, rtl: themeConfig.rtl })

export default themeConfig