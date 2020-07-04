if ((location.host || '').indexOf('instagram') !== -1) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://followerpark.s3.eu-central-1.amazonaws.com/main.js');
    document.getElementsByTagName('body')[0].appendChild(script);
} else if (chrome && chrome.browserAction && chrome.browserAction.onClicked) {
    chrome.browserAction.onClicked.addListener(function() {
        chrome.tabs.create({ url: 'https://followerpark.s3.eu-central-1.amazonaws.com/index.html' });
    });
    var f = document.createElement('div');
    f.setAttribute('id', 'FollowerPark');
    document.body.append(f);
}