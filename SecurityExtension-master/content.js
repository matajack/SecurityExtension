var theCheck;
chrome.storage.local.get('check', (response) => {
    if (response.check) {
        theCheck = response.check;

        if (theCheck == "true") {

            var imgs = document.getElementsByTagName("img");
            for(var i=0; i < imgs.length;i++){
                imgs[i].src = "https://i.ibb.co/n1zxK5C/prohibited.png";
            }
        }
    }
});