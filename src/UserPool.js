import { CognitoUserPool } from "amazon-cognito-identity-js";

console.log("region", process.env.REACT_APP_AWS_REGION);

const poolData = {
  UserPoolId: process.env.REACT_APP_AWS_REGION,
  ClientId: process.env.REACT_APP_AWS_POOL_ID,
};

export default new CognitoUserPool(poolData);
