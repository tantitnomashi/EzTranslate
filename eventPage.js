// -------------------------------------------------------
var googleTrans = {
    "id": "gg",
    "title": "Translate by Tan M. Tran ",
    "contexts": ["selection"]
};
chrome.contextMenus.create(googleTrans);

const apiKey = "AIzaSyBx-VEE7kYo3G6DbbudA-X7AHRQHO96DnM";

// Set endpoints
const endpoints = {
    "q": "",
    "source": "en",
    "target": "vi",
    "format": "text"
};

// Abstract API request function
function makeApiRequest(endpoint, type, authNeeded) {
    url = "https://translation.googleapis.com/language/translate/v2";
    url += "?key=" + apiKey;


    // Return response from API
    return $.ajax({
        url: url,
        type: "POST",
        data: endpoint,
        dataType: "json",
        success: (resp) => {
            var result = resp.data.translations[0].translatedText;
            saveVocabToLocalStorage(endpoint.q, result);
        },
        error: (xhr, status, error) => {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)

        }
    });
}

var saveVocabToLocalStorage = (srcs, results) => {

    var storage = chrome.storage.sync;
    if (results.length > 25) {
        console.log("No save");
        return;
    }
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var pair = {
        src: srcs,
        result: results,
        time: dateTime,
        repeatedTimes: 0
    };
    var sampleKey = Math.floor(Math.random() * 10000000);
    var obj = {};
    obj[sampleKey] = JSON.stringify(pair);
    storage.set(obj);
}

function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    endpoints.q = clickData.selectionText;
    makeApiRequest(endpoints, "POST", false);
    if (clickData.menuItemId == "gg" && clickData.selectionText) {
        var height = parseInt("100");
        var width = parseInt("300");
        var wikiUrl = "https://translate.google.com/?hl=la&ie=UTF8&sl=auto&tl=la#view=home&op=translate&sl=en&tl=vi&text=" + fixedEncodeURI(clickData.selectionText);
        var createData = {
            "url": wikiUrl,
            "type": "popup",
            "top": height,
            "left": width,
            "width": parseInt(screen.availWidth / 2),
            "height": parseInt(screen.availHeight / 1.5)
        };
        chrome.windows.create(createData, function () {});
    }
});
var flag = false;
// listen message has send from content.js 
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    if(request.todo == "openNewTabs" && flag == false){
       flag = true;
       displayAVocabulary();
        setInterval(()=>{
            displayAVocabulary();
        }, 60000);
    }
});

var displayDictionary = () =>{
    var height = parseInt("100");
    var width = parseInt("300");
    var createData = {
        "url": "popup.html",
        "type": "popup",
        "top": height,
        "left": width,
        "width": parseInt(screen.availWidth / 2),
        "height": parseInt(screen.availHeight / 1.5)
    };
    chrome.windows.create(createData, function () {});
}
var displayAVocabulary = () =>{
    var createData = {
        "url": "vocab/vocab.html",
        "type": "popup",
        "top": screen.availHeight - 200,
        "left": 0,
        "width": 450,
        "height": 220
    };
    chrome.windows.create(createData, function () {});
}
var openNewTabWithUrl = () => {
    var createProperties = {
            "url" : url,
            "active" :false,
            "selected" :false,
        }
    chrome.tabs.create(createProperties, function () {});
}