
// SDKの初期化
var ncmb = new NCMB(applicationKey, clientKey);

// 初期設定
document.addEventListener("deviceready", 
    initFunc(),false)

function initFunc() {
    pushInit();
}

