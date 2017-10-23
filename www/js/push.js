
function pushInit() {
    // [NCMB] プッシュ通知受信時のコールバックを登録します
    window.NCMB.monaca.setHandler (function(jsonData){
        // 送信時に指定したJSONが引数として渡されます
        //alert("callback:" + JSON.stringify(jsonData));
    })
}

    /* 端末登録成功時の処理 */
    var successCallback = function () {
            //alert("端末登録に成功しました。");
    };

    /* 端末登録失敗時の処理処理 */
    var errorCallback = function (err) {
        alert("端末登録に失敗しました:" + err);
    };

    // [NCMB] デバイストークンを取得しinstallationに登録
    window.NCMB.monaca.setDeviceToken(
        applicationKey,
        clientKey,
        senderId,
        successCallback,
        errorCallback
    );
