# CognitoCustomAuthJWT
Cognitoのカスタム認証でJWT認証をする

## レポジトリの構成
- lambda
  - カスタム認証用のLambda
- frontend_sample
  - フロントエンドのサンプル

## 使い方

### lambda

#### 前提
- 言語はTypescript+node
- serverless frameworkを仕様

#### AWSにデプロイ
1. `cd lambda`
2. `.env`に必要な情報を記載
3. `npm install`
4. `sls deploy`

### cognitoの設定
- カスタム認証フローをサポートするアプリケーションクライアントを追加
  - AWSコンソールからだと下記の手順で追加できる
    - 該当のCognitoユーザープールを開く
    - `アプリケーションの統合`を選択
    - `アプリケーションクライアントそ作成`する
    - 認証フローに`ALLOW_CUSTOM_AUTH`を選択する
- 追加したアプリケーションクライアントのIDをメモっておく

#### Frontend(React)のサンプルを動かす
1. `cd react_sample`
2. `.env.sample`をコピーして`.env`を作る
3. `.env`にユーザープールIDとアプリケーションクライアントIDを設定
4. `npm install`
5. `npm start`
