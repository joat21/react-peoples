import { useState } from "react";
import styles from "./Authorization.module.scss";
import axios from "axios";

const Authorization = () => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const onAuth = (e) => {
    e.preventDefault();
    axios
      .post("https://8aacc4e8fbc52395.mokky.dev/auth", authData)
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
      });
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Email"
        value={authData.email}
        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={authData.password}
        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
        required
      />
      <button onClick={(e) => onAuth(e)}>Register</button>
    </form>
  );
};

export default Authorization;
