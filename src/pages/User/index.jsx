import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import styles from "./User.module.scss";
import axios from "axios";

const User = () => {
  const item = useLocation().state;
  const [user, setUser] = useState(item);
  const [isEditing, setIsEditing] = useState(false);
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
  };

  return (
    <div>
      <img src={user.avatar} alt="user" />
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <br />
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <br />
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className={styles.info}>
          <span className={styles["first-name"]}>{user.firstName}</span>
          <br />
          <span className={styles["last-name"]}>{user.lastName}</span>
          <br />
          <span className={styles.mail}>{user.email}</span>
        </div>
      )}
      <button type="button" onClick={() => setIsEditing(!isEditing)}>
        Edit
      </button>
    </div>
  );
};

export default User;
