import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
            <div className={styles.text}>
              <h1>React Peoples</h1>
              <p>there are some people here</p>
            </div>
          </div>
        </Link>
        {localStorage.getItem("token") ? (
          <>
            <Link
              to={`/user/${JSON.parse(localStorage.getItem("user")).id}`}
              state={JSON.parse(localStorage.getItem("user")).id}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/registration");
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/registration">Register</Link>
            <Link to="/authorization">Auth</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
