//global
var check = "false";
chrome.storage.local.set({ 'check': check });


//BLACKLIST
var blacklistFound = [];
var blacklist = [];
chrome.storage.local.set({ 'blacklist': blacklist });


//WHITELIST
var whitelistFound = [];
var whitelist = [];
chrome.storage.local.set({ 'whitelist': whitelist });



// potential answer
chrome.storage.local.get('blacklist', (response) => {
    var client = new XMLHttpRequest();

    client.open('GET', 'https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt');
    client.onreadystatechange = function () {

        if (response.blacklist) {
            var test = response.blacklist;

            test = [];

            test.push(client.responseText);
            var broken = test[0].split('\n');
            broken.splice(0, 4);
            broken.splice(broken.length - 1, 1);
            chrome.storage.local.set({ 'blacklist': broken });
        }

    }
    client.send();
});



//listener
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // BLACKLIST
    chrome.storage.local.get('blacklist', (response) => {
        if (response.blacklist) {
            blacklistFound = response.blacklist;
        }
    });

    for (var i = 0; i < blacklistFound.length; i++) {
        if (tab.url.includes(blacklistFound[i])) {

            updateProperties = new Object();
            updateProperties.url = 'http://www.google.com';
            chrome.tabs.update(tab.id, updateProperties, function () { });
            alert("Site is blacklisted!");

            break;
        }
    }


    // WHITELIST
    chrome.storage.local.get('whitelist', (response) => {
        if (response.whitelist) {
            whitelistFound = response.whitelist;
            var change = 0;
            for (var i = 0; i < whitelistFound.length; i++) {
                if (tab.url.includes(whitelistFound[i])) {
                    check = "true";
                    chrome.storage.local.set({ 'check': check });
                    change = 1;
                    break;
                }
            }
            if (change != 1) {
                check = "false";
                chrome.storage.local.set({ 'check': check });
            }
        }
    });
});