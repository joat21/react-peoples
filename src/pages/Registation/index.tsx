import axios from "axios";
import styles from "./Registration.module.scss";
import { useState } from "react";

const Registration = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    password: "",
  });

  const onRegister = (e) => {
    e.preventDefault();

    const userToSend = { ...user };
    if (!userToSend.avatar) {
      userToSend.avatar =
        "https://sun3-22.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=400x400";
    }

    axios
      .post("https://8aacc4e8fbc52395.mokky.dev/register", userToSend)
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
        placeholder="First Name"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Last Name"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Avatar URL"
        value={user.avatar}
        onChange={(e) => setUser({ ...user, avatar: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
      />
      <button onClick={(e) => onRegister(e)}>Register</button>
    </form>
  );
};

export default Registration;
