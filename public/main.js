if ((location.host || '').indexOf('instagram') !== -1) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    const c = `
     function getCookie(name) {
       const parts = ('; ' + document.cookie).split('; ' + name + '=');
       if (parts.length === 2) return parts.pop().split(';').shift();
   }

   function postMessage(message) {
       window.parent.postMessage(message, '*');
   };

   postMessage({ type: 'scu', data: ((window || {})._sharedData || {}).config || {} });

   window.addEventListener('message', async(event) => {
       const { type, url, responseType, responseData } = ((event || {}).data || {});
       if (!((type === 'GET' || type == 'POST') && url !== 'string')) {
           return;
       }

       const response = await fetch(url, {
           "headers": {
               "x-csrftoken": getCookie('csrftoken')
           },
           'method': type,
           'credentials': 'include'
       });

       if (response.url.indexOf('/accounts/login') !== -1) {
           location.reload();
       }

       let responsejson = undefined;
       if (type !== 'POST') {
           responsejson = await response.json();
       }

       if (responseType) {
           postMessage({
               type: responseType,
               data: {
                   ...responseData,
                   ...((responsejson||{}).data || {})
               }
           });
       }
   });
    `;
    s.appendChild(document.createTextNode(c));
    document.body.appendChild(s);
}