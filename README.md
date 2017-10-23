# 【Monaca】プッシュ通知のグルーピング配信を体験しよう！
## 概要
* [ニフティクラウド mobile backend](http://mb.cloud.nifty.com/)（以下、mobile backend ）の『プッシュ通知』機能を利用して、__特定のユーザー__ (端末)に絞った配信の体験ができるサンプルプロジェクトです。アプリの管理者が設定した属性ではなく、ここではユーザー(端末)自身がアプリで設定した属性に応じてプッシュ通知の出しわけを体験できます。
 * 例えば、apple とorange とbanana という重複登録可能なグループを用意します。ユーザー(端末)は好きなグループを選択して登録をします。アプリ運営側はその設定をベースに、例えばapple グループに属しているユーザー(端末)のみを絞り込んでプッシュ通知を送ることが出来ます♪

![イメージ](/readme-img/イメージ.png)

* 簡単な操作ですぐに体験できます！！

## mobile backendって何？？
スマートフォンアプリのバックエンド機能（プッシュ通知・データストア・会員管理・ファイルストア・SNS連携・位置情報検索・スクリプト）が**開発不要**、しかも基本**無料**(注1)で使えるクラウドサービス！

注1：詳しくは[こちら](http://mb.cloud.nifty.com/price.htm)をご覧ください

![mobile backend](/readme-img/mobile-backend.png)

## 準備
### 動作環境
* PC
	* Chrome 最新版
* 端末
	* iPhone iOS 10.0.1以上
	* Android 7.0

※上記内容で動作確認をしています

### Monaca準備
* Monacaにログインをします

![Monaca準備1](/readme-img/Monaca準備1.png)

https://ja.monaca.io/

* プロジェクトをインポートします
* 「Import Project」をクリックすると、「プロジェクトのインポート」画面が表示されます
* 「プロジェクト名」を入力します　例）__プッシュ通知絞込み配信アプリ__
* 「インポート方法」では、「URLを指定してインポート」を選択し、次のURLを入力します
 * `https://github.com/natsumo/MonacaSegmentPushApp/archive/master.zip`

![Monaca準備2](/readme-img/Monaca準備2.png)

* プロジェクトが作成さてたら、「開く」をクリックします
* プロジェクトが開かれます

![Monaca準備3](/readme-img/Monaca準備3.png)

### mobile backend SDK の導入
* 「設定」＞「JS/CSSコンポーネントの追加と削除...」をクリックします
* 「ncmb」と入力して「検索」をクリックします

![SDK導入1](/readme-img/SDK導入1.png)

* 「ncmb」が表示されたら「追加」をクリックします
* SDKのバージョンは最新（デフォルト）を選択し、「インストール」をクリックします
* 「components/ncmb/ncmb.min.js」にチェックを入れて「保存する」をクリックします

![SDK導入2](readme-img/SDK導入2.png)

* 一覧に表示されれば導入完了です

![SDK導入3](readme-img/SDK導入3.png)

### mobile backend 準備
* mobile backend  にログインします

![mBaaS準備1](/readme-img/mBaaS準備1.png)
http://mb.cloud.nifty.com/

* 新しいアプリを作成します
  * アプリ名は「`SegmentPush`」と入力してください
  * mobile backend を既に使用したことがある場合は、画面上方の<br>![新しいアプリ](/readme-img/新しいアプリ.png)  をクリックすると同じ画面が表示されます

![mBaaS準備2-1](/readme-img/mBaaS準備2-1.png)

* アプリが作成されるとAPIキー（２種類）が発行されます
  * APIキーは後で使用します。
* ここでは使用しないので、「OK」で閉じます

![mBaaS準備3](/readme-img/mBaaS準備3.png)

* ダッシュボードが表示されます

![mBaaS準備4](/readme-img/mBaaS準備4.png)

### SDKの初期化
SDKの初期化は、mobile backend を使用する場合に必ず行う作業です。これによって、アプリがサーバーを認識し、連携されます。

* Monacaを開き、`www/js/app.js`ファイルを開きます
* 1行目を見てください

```js
// [NCMB] API Key
var applicationKey = "YOUR_NCMB_APPLICATION_KEY";
var clientKey = "YOUR_NCMB_CLIENT_KEY";
```

* mobile backend  のダッシュボードから、APIキー（アプリケーションキーとクライアントキー）をコピーして、それぞれ`YOUR_APPLICATION_KEY`と`YOUR_CLIENT_KEY`に貼り付けます

![SDKの初期化](/readme-img/SDKの初期化.png)

* このとき、ダブルクォーテーション「`"`」は消さないように注意しましょう

## ビルド
このサンプルの動作確認には必ずビルドが必要です。また、ビルドの際には iOS/Android それぞれで認証情報の取得とその設定が必要になります。

### iOSアプリのビルド
#### 認証情報の準備
用意する認証情報は以下4点です（表1）。

|表1|APNs認証情報|種別|
|:---|:---|:---|
|1|__開発用(developer)証明書(p12)__<br>※ cer形式から .p12形式をキーチェーンアクセスより書き出す必要があります。|ビルド|
|2|AppID作成時に記載した __Budle ID__|ビルド|
|3|__Provisioning Profile__|ビルド|
|4|__APNs用証明書(p12)__<br>※ cer形式から .p12形式をキーチェーンアクセスより書き出す必要があります。|プッシュ|

* 認証情報の取得には、Apple Developer Console へのログインが必要です
 * https://developer.apple.com/account/
 * Apple Developer Program への登録(有償)が必要です。
 * キーチェーンアクセスを利用するため、Mac が必要です。

下記リンク先詳細を確認の上、必要な認証情報を準備してください。
> 【iOS】プッシュ通知の受信に必要な証明書の作り方(開発用)
> https://github.com/NIFTYCloud-mbaas/iOS_Certificate

#### 認証情報の設定とビルド
* mobile backend を開きます
* 右上の「アプリ設定」から、「プッシュ通知」を開きます
* 「プッシュ通知の許可」の「許可する」を選択してし、「保存する」をクリックしてください
* 「iOSプッシュ通知」の「証明書の選択」をクリックして、Apple Developer Console で取得した『APNs用証明書(p12)』をインポートします

![iOS_mb_setting](/readme-img/iOS_mb_setting.png)

* Monacaを開きます
* 「設定」＞「iOSアプリ設定」を開き、「App ID」をApple Developer Console で取得した『Bundle ID』に書き換えます

![Bundleid](/readme-img/bundleid.png)

* 「設定」＞「iOSビルド設定」を開き、証明書登録します
* Apple Developer Console で取得した『開発用(developer)証明書(p12)』をインポートします

![インポート](/readme-img/インポート.png)

* 「プロファイルのアップロード」をクリックして、Apple Developer Console で取得した『Provisioning Profile』をアップロードします

![プロファイル](/readme-img/プロファイル.png)

* 「ビルド」＞「iOSアプリのビルド」を開きます

![iOSビルド](/readme-img/iOSビルド.png)

* 「デバッグビルド」を選択して、「ビルドを開始する」をクリックします
* 数秒後にipaファイルが作成されますので、画面に表示されるいずれかの方法で端末にダウンロードをしてください

### Androidアプリのビルド
#### 認証情報の準備
Androidアプリのビルドに必要な認証情報は以下の2点です(表2)。

|表2|FCM認証情報|
|:---|:---|
|1|Server key|
|2|送信者ID|

* 認証情報の取得は、Firebase Console にログインをして行ってください
 * https://console.firebase.google.com/
 * Googleアカウントが必要です

下記リンク先詳細を確認の上、必要な認証情報を準備してください

> チュートリアル (Android) : mobile backendとFCMの連携に必要な設定
> http://mb.cloud.nifty.com/doc/current/tutorial/push_setup_android.html

#### 認証情報の設定とビルド
* mobile backend を開きます
* 右上の「アプリ設定」から、「プッシュ通知」を開きます
* 「プッシュ通知の許可」の「許可する」を選択してし、「保存する」をクリックしてください
* 「Androidプッシュ通知」の「APIキー」に、Firebase console で取得した『Server key』を貼り付けて「保存する」をクリックします

![Android_mb_setting](/readme-img/Android_mb_setting.png)

* Monacaを開きます
* `www/js/app.js`ファイルを開きます
* 5行目を見てください

```js
// [FCM]送信者ID
var senderId = "YOUR_SENDER_ID";
```

* `SENDER_ID`を、Firebase consoleで取得した『送信者ID』に置き換えてください

* 「ビルド」＞「Androidアプリのビルド」を開きます

![Androidビルド](/readme-img/Androidビルド.png)

* 「デバッグビルド」を選択して、「ビルドを開始する」をクリックします
* 数秒後にapkファイルが作成されますので、画面に表示されるいずれかの方法で端末にダウンロードをしてください

## 動作確認
* 端末でアプリをインストールして起動します
* アプリの画面に __プッシュ通知の許可を求めるアラート__ が表示されたら、必ず「 __許可する__ 」をタップしてください
 * 初回起動時は再起動が必要です。
* このタイミングで端末情報がmobile backend 上に保存されます
 * アプリを再起動すると、保存された端末情報を取得し、以下のように画面に表示されます。

 ![画面1](/readme-img/画面1.png)

* サーバー側に保存された端末情報も確認しましょう！
* mobile backend のダッシュボードを開き、「データストア」＞「installation」クラスを確認します

 ![デバイストークン](/readme-img/デバイストークン.png)

* 「デバイストークン」という端末情報を取得しています
* 端末情報にはデフォルトで「 __channels__ 」という値が配列のフィールドを持ちます
 * ここにユーザー(端末)の属性を持たせて、プッシュ通知の配信グループを設定してみましょう

### 例）ユーザーの属性"apple","orange","banana"の3つのグループに分ける
ユーザーを「りんご・オレンジ・バナナのうちどれが好きか？」でグループ分けし、「りんご」が好きなユーザーにだけプッシュ通知を配信しましょう。

* 「りんご」と「オレンジ」の２種類を好きなユーザーを想定して設定をしてみましょう（★想定1）
* アプリ画面から「channels」フィールドを編集します
* 図のように「`,`」区切りで「`apple,orange`」と入力します
* 画面一番したの「update」ボタンをタップするとmobile backend 上の端末情報が更新されます

 ![画面2](/readme-img/画面2.png)

* mobile backend のダッシュボードを開き、「データストア」＞「installation」クラスを確認します
 * 配列として格納されていることが確認できます。

 ![コンパネ1](/readme-img/コンパネ1.png)

* 更新を確認したら、プッシュ通知を送ってみましょう！
* プッシュ通知を作成するため、mobile backend のダッシュボードを開き、「プッシュ通知」＞「+新しいプッシュ通知」をクリックしてください

#### 配信端末の絞込みの仕方

* 「りんご」が好きなユーザーに送ってみましょう
 * この場合「りんごが好き」、「りんごとバナナが好き」、「りんごとオレンジが好き」、「３つとも好き」のユーザーに配信されます
 * （★想定1）のユーザーも配信対象です
* 下図のようにプッシュ通知を設定してみましょう

 ![プッシュ1](/readme-img/プッシュ1.png)

設定できたら「プッシュ通知を作成する」をクリックして実際にプッシュ通知を配信してみましょう！

### 例）新しいフィールドを作成して、会員番号を設定する
アプリとは別に発行された会員番号があるとき、会員番号を指定してプッシュ通知を配信してみましょう。

* 会員番号が「123456」だと想定して、アプリから設定をしてみましょう（★想定2）
* 新しいフィールド「userId」を作成するため、「add」ボタンをタップします
* アラートでkeyの指定をします。「userId」と入力して「OK」をタップします
* フィールドが追加されるので、valueに「123456」と入力します
* 画面一番したの「update」ボタンをタップするとmobile backend 上の端末情報が更新されます

 ![画面3](/readme-img/画面3.png)

* mobile backend のダッシュボードを開き、「データストア」＞「installation」クラスを確認します

 ![コンパネ2](/readme-img/コンパネ2.png)

* 更新を確認したら、プッシュ通知を送ってみましょう！
* プッシュ通知を作成するため、mobile backend のダッシュボードを開き、「プッシュ通知」＞「+新しいプッシュ通知」をクリックしてください

#### 配信端末の絞込みの仕方
* 会員番号が「123456」であるユーザーに絞って送ってみましょう
 * （★想定2）のユーザーのみが配信対象です。（会員番号は重複しないものとして考えます）
* 下図のようにプッシュ通知を設定してみましょう

 ![プッシュ2](/readme-img/プッシュ2.png)

設定できたら「プッシュ通知を作成する」をクリックして実際にプッシュ通知を配信してみましょう！


## 解説
アプリに実装済みの内容を解説します

### プッシュ通知の受信設定

```js
// プッシュ通知受信設定
document.addEventListener("deviceready", function() {
    // [NCMB] プッシュ通知受信時のコールバックを登録します
    window.NCMB.monaca.setHandler (function(jsonData){
        // 送信時に指定したJSONが引数として渡されます
        alert("callback:" + JSON.stringify(jsonData));
    });

    /* 端末登録成功時の処理 */
    var successCallback = function () {
        // 画面にinstallation 一覧表を表示
        setup();
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

    // installationのobjectIdを取得
    getInstallationId();

},false)
```

#### Cordovaプラグインの設定
Monacaアプリでプッシュ通知を受信する場合は、必ずプラグインを有効にする必要があります。

* 「設定」＞「Cordovaプラグインの管理...」から下記を有効にします

![Cordova](/readme-img/Cordova.png)

### 端末情報の取得/更新処理
#### 取得

```js
// 画面にinstallation 一覧表を表示する処理
function setup() {
    // [NCMB] installation を取得
    ncmb.Installation.fetchById(installation_objectId)
        .then(function(installation){
            /* installation取得成功時の処理 */
            keys = Object.keys(installation);
            // リストを作成
            for (var j = 0; j < keys.length; j++) {
                var value =  installation[keys[j]];

                $.mobile.changePage($("#installationList"));
                if (keys[j] == "objectId" || keys[j] == "deviceToken" || keys[j] == "createDate" || keys[j] == "updateDate") {
                    $("#installationData").append("<tr><th id='" + keys[j] + "'>" + keys[j] + "</th><td><input type='text' style='width: 90%; color: #959595;' readonly='readonly'; id='" + keys[j] + "_v' value='" + value + "'/></tr>");

                } else if (keys[j] =="acl") {
                    // 表示しない

                } else {
                    $("#installationData").append("<tr><th id='" + keys[j] + "'>" + keys[j] + "</th><td><input type='text' style='width: 90%;' id='" + keys[j] + "_v' value='" + value + "'/></td></tr>");

                }
            }

            // リストを更新
            $("#installationData").listview('refresh');

        })
        .catch(function(err){
            /* installation取得失敗時の処理 */
            alert("installation取得に失敗しました" + err);

        });

}

// [NCMB] installationのobjectIdを取得する処理
function getInstallationId() {
    window.NCMB.monaca.getInstallationId(function(id) {
        installation_objectId = id;
    });
}
```

#### 更新

```js
/* updateボタン押下時の処理 */
function updateInstallation() {
    // [NCMB] installation取得
    ncmb.Installation.fetchById(installation_objectId)
        .then(function(installation){
            /* installation取得成功時の処理 */
            // 値の設定
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] =="acl" || keys[i] == "deviceToken" || keys[i] == "createDate" || keys[i] == "updateDate" || keys[i] =="objectId") {
                    // 何もしない  
                } else {
                    // 入力値を取得
                    if (keys[i] == "badge") { /* 数値 */
                        var originalValue = document.getElementById(keys[i] + "_v").value
                        if (originalValue.match(/[^0-9]+/)) {
                            /* 入力値が数値でない */
                            throw "badgeは半角数字を入力してください";

                        } else {
                            var key = document.getElementById(keys[i]).innerHTML;
                            var value = parseInt(document.getElementById(keys[i] + "_v").value);

                        }

                    } else if (keys[i] == "channels") { /* 配列 */
                        var key = document.getElementById(keys[i]).innerHTML;
                        var originalValue = document.getElementById(keys[i] + "_v").value;
                        var value = originalValue.split(',');

                    } else { /* 文字列 */
                        var key = document.getElementById(keys[i]).innerHTML;
                        var value = document.getElementById(keys[i] + "_v").value;
                    }

                    installation.set(key, value);
                }

            }

            // [NCMB] installationの更新
            return installation.update();

        })
        .then(function(installation){
            /* installation更新成功時の処理 */
            alert("installation更新に成功しました");

        })
        .catch(function(err){
            /* installation取得または更新失敗時の処理 */
            alert("installation更新に失敗しました:" + err);

        });

}
```
