import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={`container ${styles.container}`}>
        <a href="/">
          <div className={styles.logo}>
            <img width="38" src={logo} alt="Logo" />
            <div className={styles.text}>
              <h1>React Peoples</h1>
              <p>there are some people here</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Header;
