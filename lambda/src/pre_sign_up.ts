import { PreSignUpTriggerHandler } from 'aws-lambda';

export const handler: PreSignUpTriggerHandler = async (event) => {
  if (event.triggerSource == 'PreSignUp_SignUp') {
    //ユーザーを認証済にする
    event.response.autoConfirmUser = true;
  }
  return event;
}
