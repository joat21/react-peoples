import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./User.module.scss";
import axios from "axios";

const User = () => {
  const item = useLocation().state;
  const [user, setUser] = useState(item);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (e) => {
    e.preventDefault();

    axios.patch(`https://8aacc4e8fbc52395.mokky.dev/peoples/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const res = await axios.patch(
      `https://8aacc4e8fbc52395.mokky.dev/users/${user.id}`,
      user
    );

    if (user.id === currentUser.id) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    alert("Изменения сохранены");
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
        <button form="user-form" className="button" type="submit">
          Сохранить
        </button>
      </div>
      <form id="user-form" onSubmit={onSubmit}>
        <input
          type="text"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <input
          type="text"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </form>
    </div>
  );
};

export default User;
