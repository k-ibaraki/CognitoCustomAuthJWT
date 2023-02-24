import { Serverless } from 'serverless/aws';
import { config } from "dotenv";
config(); // .envファイルを読み込む

const awsProfile = process.env.AWS_PROFILEl
const userPoolName = process.env.USER_POOL_NAME ?? "";
const userPoolExisting = (process.env.USER_POOL_EXISTING == 'true');
const slsServiceName = process.env.SLS_SERVICE_NAME ?? "";
const jwtSecret = process.env.JWT_SECRET ?? ""

const serverlessConfiguration: Serverless = {
  service: slsServiceName,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'ap-northeast-1',
    profile: awsProfile,
  },
  functions: {
    pre_sign_up: {
      handler: 'src/pre_sign_up.handler',
      events: [
        {
          cognitoUserPool: {
            pool: userPoolName,
            trigger: 'PreSignUp',
            existing: userPoolExisting,
          },
        },
      ],
    },
    define_auth_challenge: {
      handler: 'src/define_auth_challenge.handler',
      events: [
        {
          cognitoUserPool: {
            pool: userPoolName,
            trigger: 'DefineAuthChallenge',
            existing: userPoolExisting,
          },
        },
      ],
    },
    create_auth_challenge: {
      handler: 'src/create_auth_challenge.handler',
      events: [
        {
          cognitoUserPool: {
            pool: userPoolName,
            trigger: 'CreateAuthChallenge',
            existing: userPoolExisting,
          },
        },
      ],
    },
    verify_auth_challenge: {
      handler: 'src/verify_auth_challenge.handler',
      events: [
        {
          cognitoUserPool: {
            pool: userPoolName,
            trigger: 'VerifyAuthChallengeResponse',
            existing: userPoolExisting,
          },
        },
      ],
      environment: {
        JWT_SECRET: jwtSecret,
      }
    },
  },
  plugins: ['serverless-plugin-typescript'],
  package: {
    patterns: [
      'dist/**/*.js',
      'node_modules/**',
      '!node_modules/@aws-**',
      '!node_modules/aws-**',
    ]
  },
};

module.exports = serverlessConfiguration;