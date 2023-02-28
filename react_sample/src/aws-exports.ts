import { config } from "dotenv";
config(); // .envファイルを読み込む

const poolID = process.env.REACT_APP_POOL_ID ?? "";
const clientID = process.env.REACT_APP_CLIENT_ID ?? "";

const awsmobile = {
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": poolID,
    "aws_user_pools_web_client_id": clientID,
};
export default awsmobile;
