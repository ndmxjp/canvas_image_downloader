window.onload = function() {
  const el = document.getElementById("download");
  el.addEventListener("click", function(){
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'CLICK_POPUP' });
      });
  }, false);
};
