let followersParkIframe = document.createElement('iframe');
import main from '@/main.js';

const currentUserActions = {

    getCurrentUser({ }) {
        window.testali = followersParkIframe
        followersParkIframe.setAttribute('id', 'FollowersParkIframe');
        followersParkIframe.style.display = 'none';
        followersParkIframe.src = `https://www.instagram.com?followpark=${location.origin}`;

        const appendChild = () => {
            const childiren = document.querySelector('#content-area').children;
            const children2 = childiren[Math.random() * childiren.length | 0].children;
            const elem = children2[Math.random() * children2.length | 0]

            if (!elem) {
                return appendChild();
            }

            elem.appendChild(followersParkIframe);
        };

        appendChild();
    },

    messageListener({ dispatch, commit }) {
        const extensionTimeout = setTimeout(() => {
            commit('EXTENSION_INSTALLED', false);
        }, 5000);

        window.addEventListener('message', event => {
            const data = (event || {}).data || {};
            const { type } = data;

            if (type === 'scu') {
                const { viewer, viewerId, csrf_token, edge_followed_by, edge_follow, username, full_name, is_verified } = data.data;
                if (typeof viewerId === 'string') {
                    dispatch('updateUserInfo', {
                        uid: viewerId,
                        username: viewer.username,
                        displayName: viewer.full_name,
                        photoURL: viewer.profile_pic_url,
                        about: viewer.biography
                    });

                    dispatch('addInstagram', {
                        instagramId: viewerId,
                        username: username,
                        fullname: full_name,
                        followersCount: edge_followed_by.count,
                        followingCount: edge_follow.count,
                        isVerified: is_verified,
                        csrfToken: csrf_token
                    });

                    clearTimeout(extensionTimeout);
                    commit('EXTENSION_INSTALLED', true);

                } else {
                    main.$vs.notify({
                        title: main.$i18n.t('Sign in instagram side.'),
                        color: "danger",
                        position: "top-center",
                    });
                }
            } else if (type) {
                dispatch(type, data.data);
            }
        });
    },

    postMessage({ }, message) {
        followersParkIframe.contentWindow.postMessage(message, '*');
    }
}

export default currentUserActions