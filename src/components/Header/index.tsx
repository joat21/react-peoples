import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useContext(DataContext);
  const user = JSON.parse(localStorage.getItem("user"));

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
        {isAuthorized && (
          <div className={styles.profile}>
            <Link to={`/user/${user.firstName}${user.lastName}`} state={user}>
              <span>
                {user.firstName} {user.lastName}
              </span>
              <img src={user.avatar} alt="ava" />
            </Link>
            <button
              className={`button ${styles.btn}`}
              onClick={() => {
                setIsAuthorized(false);
                navigate("/registration");
                localStorage.clear();
              }}
            >
              Выйти
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
