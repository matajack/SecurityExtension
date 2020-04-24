document.addEventListener('DOMContentLoaded', function () {

    //modify to blacklist
    var modify = document.getElementById('modify');
    modify.addEventListener('click', function () {
        document.getElementById("outputmodify").innerHTML = "";
        var siteURL = new String($('#siteURL').val());
        chrome.storage.local.get('blacklist', (response) => {
            if (response.blacklist) {
                var temp = response.blacklist;
                var change = 0;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].includes(siteURL.toString())) { //if its already on BL
                        document.getElementById("outputmodify").innerHTML = "Website is already in the blacklist!";
                        change = 1;
                        break;
                    }
                }//foor loop
                if (change != 1) { //add to the black list
                    if (siteURL != undefined) {
                        chrome.storage.local.get('blacklist', (response) => {
                            if (response.blacklist) {
                                var temp1 = response.blacklist;
                                temp1.push(siteURL.toString());
                                chrome.storage.local.set({ 'blacklist': temp1 });
                                document.getElementById("outputmodify").innerHTML = "Added to the blacklist:<br />" + siteURL.toString();
                            }
                        });
                    }
                }
            }
        });
    }); //onclick end

    //remove from blacklist
    var remove = document.getElementById('remove');
    remove.addEventListener('click', function () {
        chrome.storage.local.get('blacklist', (response) => {
            temp = response.blacklist;
            var change = 0;
            var siteURL = new String($('#siteURL').val());
            for (var i = 0; i < temp.length; i++) {
                if (temp[i] == siteURL.toString()) {
                    temp.splice(i, 1);
                    chrome.storage.local.set({ 'blacklist': temp });
                    document.getElementById("outputmodify").innerHTML = "Removed from the blacklist!<br />" + siteURL.toString();
                    change = 1;
                    break;
                }
            }

            if (change != 1) {
                document.getElementById("outputmodify").innerHTML = "Website is not on the list!";
            }
        });
    });

    //print blacklist
    var visible = 0;
    var print = document.getElementById('print');
    print.addEventListener('click', function () {
        document.getElementById("outputPrint").innerHTML = "";
        chrome.storage.local.get('blacklist', (response) => {
            if (response.blacklist) {
                temp = response.blacklist;
                if (visible == 0) {
                    var output = temp.toString();
                    document.getElementById("outputPrint").innerHTML += output.split(',').join("<br />");
                    visible = 1;
                }
                else {
                    visible = 0;
                }

            }
        });
    }); //onclick end

    //modify to whitelist
    var modifyWhite = document.getElementById('modifyWhite');
    modifyWhite.addEventListener('click', function () {

        document.getElementById("outputmodify").innerHTML = "";
        var siteURLWhite = new String($('#siteURLWhite').val());
        chrome.storage.local.get('whitelist', (response) => {
            if (response.whitelist) {
                var temp = response.whitelist;
                var change = 0;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].includes(siteURLWhite.toString())) { //if its already on BL
                        document.getElementById("outputmodifyWhite").innerHTML = "Website is already in the whitelist!";
                        change = 1;
                        break;
                    }
                }//foor loop
                if (change != 1) {
                    change = 0;
                    if (siteURLWhite != undefined) {
                        chrome.storage.local.get('whitelist', (response) => {
                            if (response.whitelist) {
                                var temp1 = response.whitelist;
                                temp1.push(siteURLWhite.toString());
                                chrome.storage.local.set({ 'whitelist': temp1 });
                                document.getElementById("outputmodifyWhite").innerHTML = "Added to the whitelist:" + siteURLWhite.toString();
                            }
                        });
                    }
                }
            }
        });
    }); //onclick end

    //remove from whitelist
    var remove = document.getElementById('removeWhite');
    remove.addEventListener('click', function () {
        chrome.storage.local.get('whitelist', (response) => {
            temp = response.whitelist;
            var change = 0;
            var siteURL = new String($('#siteURLWhite').val());
            for (var i = 0; i < temp.length; i++) {
                if (temp[i] == siteURL.toString()) {
                    temp.splice(i, 1);
                    chrome.storage.local.set({ 'whitelist': temp });
                    document.getElementById("outputmodifyWhite").innerHTML = "Removed from the whitelist!<br />" + siteURL.toString();
                    change = 1;
                    break;
                }
            }

            if (change != 1) {
                document.getElementById("outputmodifyWhite").innerHTML = "Website is not on the list!";
            }
        });
    });

    //print whitelist
    var visibleWhite = 0;
    var printWhite = document.getElementById('printWhite');
    printWhite.addEventListener('click', function () {
        document.getElementById("outputPrintWhite").innerHTML = "";
        chrome.storage.local.get('whitelist', (response) => {
            if (response.whitelist) {
                temp = response.whitelist;
                if (visibleWhite == 0) {
                    var output = temp.toString();
                    document.getElementById("outputPrintWhite").innerHTML += output.split(',').join("<br />");
                    visibleWhite = 1;
                }
                else {
                    visibleWhite = 0;
                }

            }
        });
    }); //onclick end
});