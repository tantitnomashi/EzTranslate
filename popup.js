//import {openNewTabWithUrl} from 'eventPage';

$(document).ready(function () {
    getData();
    $("#save-word").click(() => {
        addNewWord($("#inputWord").val());
        setTimeout(() => {
            $("#inputWord").val("");
            location.reload();
        }, 100);

    });
    // openNewTabWithUrl("https://hype.codes/how-include-js-file-another-js-file");
});

function drawDic(allKeys) {
    console.log(allKeys + " ---- alllkeys");
    allKeys.forEach(element => {
        chrome.storage.sync.get([element], function (a) {
            console.log(a);
            var obj = JSON.parse(a[Object.keys(a)[0]]);
            var tr = document.createElement("tr");
            var src = document.createElement("td");
            var result = document.createElement("td");
            var remove = document.createElement("td");
            // Set property to table
            remove.innerHTML = "<button id='" + element + "' class='btn btn-danger del-word'>x</button>";
            remove.classList.add('text-center');
            src.innerHTML = obj.src;
            result.innerHTML = obj.result;
            tr.appendChild(src);
            tr.appendChild(result);
            tr.appendChild(remove);
            // draw a dictionary in chrome book 
            $("#tbl-dic").append(tr);
        });
    });

    setTimeout(() => {
        document.querySelectorAll('.del-word').forEach(item => {
            item.addEventListener('click', e => {
                removeAWord(e.target.id);
                location.reload();
            })
        });
    }, 50);
}

function getData() {
    var keys = [];
    chrome.storage.sync.get(null, function (items) {
        keys = Object.keys(items);
        console.log(keys); // Array 5 values 
    });
    setTimeout(() => {
        drawDic(keys);
    }, 100);
    
}

var displayAVocabolary = () => {
    var height = parseInt("300");
    var width = parseInt("300");
    var createData = {
        "url": "vocab/vocab.html",
        "type": "popup",
        "top": height,
        "left": width,
        "width": parseInt(screen.availWidth / 3),
        "height": parseInt(screen.availHeight / 5)
    };
    chrome.windows.create(createData, function () {});
    // display vocabulary 
}
// var openNewTabWithUrl = (url) => {
//     var createProperties = {
//             "url" : url,
//             "active" :false,
//             "selected" :true,
//         }
//     chrome.tabs.create(createProperties, function () {});
// }
var removeAWord = (key) => {
    chrome.storage.sync.remove(key, () => {
        console.log("removed : " + key);
    });
}