import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import axios from "axios";
import styles from "./Authorization.module.scss";

const Authorization = () => {
  const { setIsAuthorized } = useContext(DataContext);

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://8aacc4e8fbc52395.mokky.dev/auth", authData)
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        setIsAuthorized(true);
        navigate("/");
      });
  };

  return (
    <div className={styles.root}>
      <h2>Войти в аккаунт</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={authData.email}
          onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={authData.password}
          onChange={(e) =>
            setAuthData({ ...authData, password: e.target.value })
          }
          required
        />
        <button className="button" type="submit">
          Войти
        </button>
      </form>
      <span>
        Нет аккаунта? <Link to="/registration">Создать</Link>
      </span>
    </div>
  );
};

export default Authorization;
