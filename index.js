window.onload = function(){

  chrome.runtime.onMessage.addListener(message => {
    // コールバックでpopup.jsからの値を受け取れる
    if (message.type !== 'CLICK_POPUP') {
      return;
    }

    const zip = new JSZip();
    const img = zip.folder('images');

    const elements = Array.from(document.getElementsByTagName('canvas'));
    const datas = elements.map((element) => {
      return element.toDataURL("image/png").replace(/^.*,/, '');
    }).forEach((data, idx) => {
      img.file(`${idx}.png`, data, {base64: true});
    })

    zip.generateAsync({type:"blob"})
    .then((content) => {
      // see FileSaver.js
      saveAs(content, "images.zip");
    });
    console.log(datas);
  });
}