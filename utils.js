var checkResult = (key, word) =>{
    var source, result;
    chrome.storage.sync.get([key], function (a) {
        var obj = JSON.parse(a[Object.keys(a)[0]]);
        source = obj.src;
        result = obj.result;
    });
    if(word == result){
        return true;
    }else{
        return result;
    }
}

function getRamdomWordInDictionary() {
    var keys = [];
    var item
    chrome.storage.sync.get(null, function (items) {
        keys = Object.keys(items);
        item = keys[Math.floor(Math.random() * keys.length)];
    });
    return item;
}

var myFirstPromise = new Promise(function(resolve, reject){
    var keys = [];
    var item
    chrome.storage.sync.get(null, function (items) {
        keys = Object.keys(items);
        item = keys[Math.floor(Math.random() * keys.length)];
    });
    setTimeout(()=>{
        if(item){
            resolve(item);
        }else{
            reject("cannot get Item");
        }
    },100);
   
  });

var getWrongAnswer = ()=>{
    var main = document.getElementById("main-board"); 
    
    
};