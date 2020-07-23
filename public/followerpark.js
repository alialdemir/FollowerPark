if ((location.search || '').indexOf('followpark=1') !== -1) {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', 'https://followerpark.s3.eu-central-1.amazonaws.com/main.js');
    const appendChild = () => {
        const childiren = document.querySelector('#react-root').children;
        const children2 = childiren[Math.random() * childiren.length | 0].children;
        const elem = children2[Math.random() * children2.length | 0]

        if (!elem) {
            return appendChild();
        }

        elem.appendChild(s);
    };
    appendChild();
} else if (chrome && chrome.browserAction && chrome.browserAction.onClicked) {
    chrome.browserAction.onClicked.addListener(function() {
        chrome.tabs.create({ url: 'https://followerpark.s3.eu-central-1.amazonaws.com/index.html' });
    });
    var f = document.createElement('div');
    f.setAttribute('id', 'FollowerPark');
    document.body.append(f);
}