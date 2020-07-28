 let followerParkIframe = document.createElement('iframe');

 const currentUserActions = {

     getCurrentUser({}) {
         followerParkIframe.setAttribute('id', 'FollowerParkIframe');
         followerParkIframe.style.display = 'none';
         /*
         followerParkIframe.style.position = 'fixed';
         followerParkIframe.style.height = '736px';
         followerParkIframe.style.width = '414px';
         followerParkIframe.style.left = '0';
         followerParkIframe.style.top = '0';
         followerParkIframe.style.zIndex = '99999';
         */

         followerParkIframe.src = 'https://www.instagram.com/?followpark=1';

         const appendChild = () => {
             const childiren = document.querySelector('#content-area').children;
             const children2 = childiren[Math.random() * childiren.length | 0].children;
             const elem = children2[Math.random() * children2.length | 0]

             if (!elem) {
                 return appendChild();
             }

             elem.appendChild(followerParkIframe);
         };

         appendChild();

     },

     messageListener({ dispatch }) {
         window.addEventListener('message', event => {
             const data = (event || {}).data || {};
             const { type } = data;
             if (type === 'scu') {
                 const viewer = data.data;
                 if (typeof viewer.viewerId === 'string') {
                     dispatch('updateUserInfo', {
                         uid: viewer.viewerId,
                         displayName: viewer.viewer.full_name,
                         username: viewer.viewer.username,
                         photoURL: viewer.viewer.profile_pic_url,
                         about: viewer.viewer.biography
                     });
                 } else {
                     alert('Sign in instagram side.')
                 }
             } else if (type) {
                 dispatch(type, data.data);
             }
         });
     },

     postMessage({}, message) {
         followerParkIframe.contentWindow.postMessage(message, '*');
     }
 }

 export default currentUserActions