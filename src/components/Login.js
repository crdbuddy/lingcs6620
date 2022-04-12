import React, { useState } from "react";
import UserPool from "../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Login = () => {
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");

  const AWS = require("aws-sdk");
  var s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET,
  });

  const bucketName = "testbucketling";
  const signedUrlExpireSeconds = 60 * 5;

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: "123456",
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (data) => {
        if (data.accessToken.jwtToken) {
          const zipLink = await s3.getSignedUrl("getObject", {
            Bucket: bucketName,
            Key: username + ".zip",
            Expires: signedUrlExpireSeconds,
          });
          toast.success("Successfully login!", { autoClose: 8000 });
          toast.info("Click link above to download zip file", {
            autoClose: 8000,
          });

          setUrl(zipLink);
        }
      },
      onFailure: (err) => {
        console.error("onFailure :", err);
        toast.error("Login failed", { autoClose: 4000 });
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequred: ", data);
        toast.error("newPasswordRequred...", { autoClose: 4000 });
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {url ? (
          <div>
            <a href={url} download>
              Download your survey
            </a>
          </div>
        ) : (
          ""
        )}
        <label htmlFor="email">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
