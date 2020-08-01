/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import auth from "@/middleware/authService";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: '',
            component: () =>
                import ('@/layouts/full-page/FullPage.vue'),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================
                {
                    path: '/',
                    name: 'home',
                    component: () =>
                        import ('@/views/pages/SPA/Home.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/login',
                    name: 'page-login',
                    component: () =>
                        import ('@/views/pages/Login.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/register',
                    name: 'page-register',
                    component: () =>
                        import ('@/views/pages/Register.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/forgot-password',
                    name: 'forgot-password',
                    component: () =>
                        import ('@/views/pages/ForgotPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/reset-password',
                    name: 'reset-password',
                    component: () =>
                        import ('@/views/pages/ResetPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/offer',
                    name: 'offer',
                    component: () =>
                        import ('@/views/pages/Offer.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/policy',
                    name: 'policy',
                    component: () =>
                        import ('@/views/pages/Policy.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () =>
                        import ('@/views/pages/Error404.vue')
                },
            ]
        },
        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () =>
                import ('./layouts/main/Main.vue'),
            children: [
                // =============================================================================
                // Theme Routes
                // =============================================================================
                {
                    path: '/tasks',
                    name: 'task',
                    component: () =>
                        import ('./views/Task.vue')
                },
                {
                    path: '/user-list',
                    name: 'UserList',
                    component: () =>
                        import ('./views/UserLists.vue')
                },
                {
                    path: '/direct-messages',
                    name: 'DirectMessages',
                    component: () =>
                        import ('./views/DirectMessages.vue')
                },
                {
                    path: '/block-list',
                    name: 'BlockList',
                    component: () =>
                        import ('./views/BlockList.vue')
                },
                {
                    path: '/index.html',
                    name: 'task',
                    component: () =>
                        import ('./views/Task.vue')
                },
                {
                    path: '/Task/New',
                    name: 'newtask',
                    component: () =>
                        import ('./views/NewTask.vue')
                },
            ],
        },

        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})



router.beforeEach((to, from, next) => {
    if (
        to.path === "/login" ||
        to.path === "/forgot-password" ||
        to.path === "/reset-password" ||
        to.path === "/register" ||
        to.path === "/offer" ||
        to.path === "/policy" ||
        to.path === "/pages/error-404" ||
        to.path === "/pages/error-500"
    ) {
        return next();
    }

    const isAuthenticated = auth.isAuthenticated();
    if (to.path === '/' && isAuthenticated) {
        router.push({ path: '/tasks' });

        return;
    }

    // If auth required, check login. If login fails redirect to login page
    if (to.path !== '/' && !isAuthenticated) {
        router.push({ path: '/login', query: { to: to.path } })
    }

    return next()

});

export default router