import React, { useState } from "react";
import UserPool from "../UserPool";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    UserPool.signUp(username, "123456", [], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      toast.success("Registered!", { autoClose: 8000 });
      toast.warn("Admin needs to confirm this user on S3", {
        autoClose: 8000,
      });
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
