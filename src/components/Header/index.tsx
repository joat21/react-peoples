import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Profile from "./components/Profile";

import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const isAuthorized = useSelector((state) => state.authorization.isAuthorized);

  return (
    <div className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
            <div className={styles.text}>
              <h1>React Peoples</h1>
              <p>здесь какие-то люди</p>
            </div>
          </div>
        </Link>
        {isAuthorized && <Profile />}
      </div>
    </div>
  );
};

export default Header;
