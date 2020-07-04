/*=========================================================================================
  File Name: globalComponents.js
  Description: Here you can register components globally
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import VxTooltip from './layouts/components/vx-tooltip/VxTooltip.vue'
import VxCard from './components/vx-card/VxCard.vue'
import VxList from './components/vx-list/VxList.vue'
import VxBreadcrumb from './layouts/components/VxBreadcrumb.vue'
import FeatherIcon from './components/FeatherIcon.vue'
import VxInputGroup from './components/vx-input-group/VxInputGroup.vue'
import FpChooseAction from './components/task-wizard-steps/FpChooseAction'
import FpChooseResource from './components/task-wizard-steps/FpChooseResource'
import FpChooseUserResource from './components/task-wizard-steps/FpChooseUserResource'
import FpChooseWhereUserResource from './components/task-wizard-steps/FpChooseWhereUserResource'
import FpChooseSpeedAction from './components/task-wizard-steps/FpChooseSpeedAction'
import FpChooseUnfollowOption from './components/task-wizard-steps/FpChooseUnfollowOption'
import FpChooseUnfollowUserCount from './components/task-wizard-steps/FpChooseUnfollowUserCount'
import FpTaskTabs from './components/task-detail/FpTaskTabs'
import FpTaskLogs from './components/task-detail/FpTaskLogs'

Vue.component(VxTooltip.name, VxTooltip)
Vue.component(VxCard.name, VxCard)
Vue.component(VxList.name, VxList)
Vue.component(VxBreadcrumb.name, VxBreadcrumb)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component(VxInputGroup.name, VxInputGroup)
Vue.component(FpChooseAction.name, FpChooseAction)
Vue.component(FpChooseResource.name, FpChooseResource)
Vue.component(FpChooseUserResource.name, FpChooseUserResource)
Vue.component(FpChooseWhereUserResource.name, FpChooseWhereUserResource)
Vue.component(FpChooseSpeedAction.name, FpChooseSpeedAction)
Vue.component(FpChooseUnfollowOption.name, FpChooseUnfollowOption)
Vue.component(FpChooseUnfollowUserCount.name, FpChooseUnfollowUserCount)
Vue.component(FpTaskTabs.name, FpTaskTabs)
Vue.component(FpTaskLogs.name, FpTaskLogs)


// v-select component
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
    Deselect: {
        render: createElement => createElement('feather-icon', {
            props: {
                icon: 'XIcon',
                svgClasses: 'w-4 h-4 mt-1'
            }
        }),
    },
    OpenIndicator: {
        render: createElement => createElement('feather-icon', {
            props: {
                icon: 'ChevronDownIcon',
                svgClasses: 'w-5 h-5'
            }
        }),
    },
});

Vue.component(vSelect)