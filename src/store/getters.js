import { getField } from 'vuex-map-fields';

const getters = {
    getField,

    taskActions: (state) => (actionId) => {
        return (
            state.taskActions.filter(item => item.id === actionId)[0] || {}
        ).text;
    },

    resources: (state) => (task) => {
        switch (task.action) {
            case 2:
                return (
                    state.whereUserResources.filter(
                        item => item.id === task.whereUserResource
                    )[0] || {}
                ).text;
            case 3:
                return (
                    state.unfollowOptions.filter(
                        item => item.id === task.unfollowOption
                    )[0] || {}
                ).text;
            case 6:
                return (
                    state.directMessageSources.filter(
                        item => item.id === task.directMessageSource
                    )[0] || {}
                ).text;
        }
    },

    speed: (state) => (intervalSpeed) => {
        return (
            state.speedTypes.filter(item => item.id === intervalSpeed)[0] || {}
        ).text;
    },
    // COMPONENT
    // vx-autosuggest
    // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
    windowBreakPoint: state => {
        // This should be same as tailwind. So, it stays in sync with tailwind utility classes
        if (state.windowWidth >= 1200) return "xl"
        else if (state.windowWidth >= 992) return "lg"
        else if (state.windowWidth >= 768) return "md"
        else if (state.windowWidth >= 576) return "sm"
        else return "xs"
    }
}

export default getters