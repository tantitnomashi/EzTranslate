
var googleTrans = {
    "id" : "gg",
    "title":"Trans by Google Translate",
    "contexts":["selection"]
};

chrome.contextMenus.create(googleTrans);

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "gg" && clickData.selectionText){    
        var height = parseInt("100");
        var width = parseInt("300");
        var wikiUrl = "https://translate.google.com/?hl=la&ie=UTF8&sl=auto&tl=la#view=home&op=translate&sl=en&tl=vi&text=" + fixedEncodeURI(clickData.selectionText);
        var createData = {
            "url": wikiUrl,
            "type": "popup",
            "top": height,
            "left": width,
            "width": parseInt(screen.availWidth/2),
            "height": parseInt(screen.availHeight/1.5)
        };              
        chrome.windows.create(createData, function(){});      
    
    }
   
});
