import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Profile from "./components/Profile";

import { RootState } from "../../redux/store";

import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

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
