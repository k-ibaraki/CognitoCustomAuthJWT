import { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { verify } from 'jsonwebtoken';

const client = new CognitoIdentityProviderClient({ region: 'ap-northeast-1' });

//カスタムチャレンジの結果を検証する処理
export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event) => {
  console.log(event);
  const token = event.request?.challengeAnswer; // ここに入力して貰った値が入る
  const jwtSecret = process.env.JWT_SECRET ?? ''
  console.log(token);
  console.log(jwtSecret);


  // 具体的な認証処理はここに書く
  const confirmed: boolean = verifyJwt(token, jwtSecret);

  //結果をセット
  event.response.answerCorrect = confirmed;

  return event;
};

// jwtの検証
const verifyJwt = (token: string, jwtSecret: string): boolean => {

  try {
    const decoded = verify(token, jwtSecret);
    console.log("verifyJwt() was successful.");
    console.log(decoded)
  } catch {
    console.log("This JWT token was invalid.");
    return false
  }
  return true;
};