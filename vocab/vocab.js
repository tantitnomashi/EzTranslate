var currentWord = "";
$(document).ready(function () {

    myFirstPromise.then(function (element) {
        drawPopup(element);
    }).catch((err) => {
        console.log(err);
    });
     
    // remove the word ín 
    $("#remove-word").click(() => {
        removeAWord(currentWord);
        $("#remove-word").html("Removed !");
        $("#remove-word").removeClass("btn-danger");
        $("#remove-word").addClass("btn-outline-success");
    })
    $("#source").click(() => {
        var word = $("#source").text();
        openWithCambridgeDic(word);
    });

});



function drawPopup(element) {
    currentWord = element;
    console.log(element);
    chrome.storage.sync.get([element], function (a) {
        var obj = JSON.parse(a[Object.keys(a)[0]]);
        console.log(obj);
        $("#source").html(obj.src);
        $("#result").html(obj.result);
    });


    var tabId;
    chrome.tabs.getCurrent((tab) => {
        tabId = tab.id;
    });
    setTimeout(() => {
        chrome.tabs.remove(tabId, () => {
            console.log("close");
        });
    }, 15000);
}

var removeAWord = (key) => {
    chrome.storage.sync.remove(key, () => {
        console.log("removed this word : " + key);
    });
}

function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}
var openWithCambridgeDic = (word) => {
    var height = parseInt("100");
    var width = parseInt("300");
    var camUrl = "https://dictionary.cambridge.org/vi/dictionary/english/" + fixedEncodeURI(word);
    var createData = {
        "url": camUrl,
        "type": "popup",
        "top": height,
        "left": width,
        "width": parseInt(screen.availWidth / 2),
        "height": parseInt(screen.availHeight / 1.5)
    };
    chrome.windows.create(createData, function () {});
    // For deep search with Cambridge Dictionary 
    
}