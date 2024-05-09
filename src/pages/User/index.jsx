import { useLocation } from "react-router-dom";
import styles from "./User.module.scss";

const User = () => {
  const user = useLocation().state;
  console.log(user);
  return (
    <div>
      <img src={user.avatar} alt="user" />
      <div className={styles.info}>
        <span className={styles["first-name"]}>{user.first_name}</span>
        <br />
        <span className={styles["last-name"]}>{user.last_name}</span>
        <br />
        <span className={styles.mail}>{user.email}</span>
      </div>
    </div>
  );
};

export default User;
