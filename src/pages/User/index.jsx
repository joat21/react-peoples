import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import styles from "./User.module.scss";
import axios from "axios";

const User = () => {
  const item = useLocation().state;
  const [user, setUser] = useState(item);
  const [isEditing, setIsEditing] = useState(false);

  const onButtonClick = (e) => {
    e.preventDefault();
    axios.patch(`https://8aacc4e8fbc52395.mokky.dev/peoples/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    axios
      .patch(
        `https://8aacc4e8fbc52395.mokky.dev/users/${localStorage.getItem(
          "userId"
        )}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => localStorage.setItem("user", JSON.stringify(user)));
  };

  return (
    <div>
      <img src={user.avatar} alt="user" />
      {isEditing ? (
        <form>
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
          <button onClick={(e) => onButtonClick(e)}>Save</button>
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
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    </div>
  );
};

export default User;
