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
1. `.env`に必要な情報を記載
2. `npm install`
3. `sls deploy`
