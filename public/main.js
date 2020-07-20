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
   
function getCookie(name) {
    const parts = ('; ' + document.cookie).split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function postMessage(message) {
    window.parent.postMessage(message, '*');
};

async function sendFetch({ type, url, responseType, responseData }) {
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
                ...((responsejson || {}).data || responsejson || {})
            }
        });
    }
}

function sendDm({ thread_id, text }) {
    try {
        return new Promise(rs => {
            __mqtt.sendTextMessage(thread_id, text).then(res => {
                rs({ data: res, status: 200 });
            }).catch(t => {
                rs({ data: t, status: -1 });
            })
        })
    } catch (e) {
        console.log('FollowerPark error', e)
        return { status: -10 };
    }
}

postMessage({ type: 'scu', data: ((window || {})._sharedData || {}).config || {} });

window.addEventListener('message', async(event) => {
    const data = ((event || {}).data || {});
    const { type, url } = data;
    if (!((type === 'GET' || type == 'POST' || type === 'dm') && url !== 'string')) {
        return;
    }

    if (type === 'dm') {
        sendDm(data);
    } else {
        sendFetch(data);
    }
});
    `;
    s.appendChild(document.createTextNode(c));
    document.body.appendChild(s);
}