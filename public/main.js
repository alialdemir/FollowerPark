const HEADERS_TO_STRIP_LOWERCASE = [
    'content-security-policy',
    'x-frame-options',
];
if (chrome && chrome.webRequest && chrome.webRequest.onHeadersReceived) {
    chrome.webRequest.onHeadersReceived.addListener(
        details => ({
            responseHeaders: details.responseHeaders.filter(header =>
                !HEADERS_TO_STRIP_LOWERCASE.includes(header.name.toLowerCase()))
        }), {
            urls: ['<all_urls>']
        }, ['blocking', 'responseHeaders']);
}

if ((location.host || '').indexOf('instagram') !== -1) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    const c = `
     class followerPark {
       constructor() {
           this.postMessage({
               type: 'scu',
               data: ((window || {})._sharedData || {}).config || {},
           });

           window.addEventListener('message', async(event) => {
               const data = (event || {}).data || {};
               const { type, url } = data;
               if (!(
                       (type === 'GET' || type == 'POST' || type === 'dm') &&
                       url !== 'string'
                   )) {
                   return;
               }

               if (type === 'dm') {
                   this.sendDm(data);
               } else {
                   this.sendFetch(data);
               }
           });
       }

       getCookie(name) {
           const parts = ('; ' + document.cookie).split('; ' + name + '=');
           if (parts.length === 2) return parts.pop().split(';').shift();
       };

       postMessage(message) {
           window.parent.postMessage(message, '*');
       };

       async sendFetch({
           type,
           url,
           responseType,
           responseData,
           requestData,
           contentType,
       }) {
           const response = await fetch(url, {
               headers: {
                   'x-csrftoken': this.getCookie('csrftoken'),
                   'content-type': contentType || 'application/json',
                   'x-ig-app-id': '936619743392459',
               },
               method: type,
               mode: 'cors',
               credentials: 'include',
               body: requestData || null,
           });

           if (response.url.indexOf('/accounts/login') !== -1) {
               location.reload();
           }

           let responsejson = undefined;

           try {
               responsejson = await response.json();
           } catch (error) {}

           if (responseType) {
               this.postMessage({
                   type: responseType,
                   data: {
                       ...responseData,
                       ...((responsejson || {}).data || responsejson || {}),
                   },
               });
           }
       };

       sendDm({ responseData, responseType, }) {
           __mqtt.sendTextMessage(responseData.thread_id, responseData.directMessage)
           if (responseType) {
               this.postMessage({
                   type: responseType,
                   data: responseData,
               });
           }
       };
   }

   new followerPark();
    `;
    s.appendChild(document.createTextNode(c));
    document.body.appendChild(s);
}