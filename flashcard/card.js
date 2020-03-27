
var container = document.getElementById("main");
var text = document.getElementById('text');
let question = "";
let answer = "";
var currentWord = "";
$(document).ready(function () {
   
    myFirstPromise.then(function (element) {
        getDataOfWord(element);
    }).catch((err) => {
        console.log(err);
    });
    container.addEventListener("click", function(){
        flip(question, answer);
    });
    var tabId;
    chrome.tabs.getCurrent((tab) => {
        tabId = tab.id;
    });
    setTimeout(() => {
       $("#text").html(question);
       console.log(question + " hahahaha");
    }, 100);
    setTimeout(() => {
        chrome.tabs.remove(tabId, () => {
            console.log("close");
        });
    }, 15000);
});
var getDataOfWord = function (element) {
        chrome.storage.sync.get([element], function (a) {
            var obj = JSON.parse(a[Object.keys(a)[0]]);
            question = obj.src;
            answer =  obj.result;
        });
}; 
function flip(source, result) {
	container.classList.toggle('ans')
	setTimeout(function() {
		text.innerText = (container.classList.contains('ans')) ? result : source ;
	}, 100)
}
