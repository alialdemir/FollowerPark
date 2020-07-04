 let followerParkIframe = document.createElement('iframe');

 const currentUserActions = {

     getCurrentUser({ dispatch }) {
         followerParkIframe.setAttribute('id', 'FollowerParkIframe');
         followerParkIframe.style.display = 'none';

         followerParkIframe.src = 'https://www.instagram.com/p/B2cFIzbHf5I/embed';
         document.body.appendChild(followerParkIframe);
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