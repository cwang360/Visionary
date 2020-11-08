console.log("background running");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    console.log(tab);
    let msg = {
        txt: "run"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}

