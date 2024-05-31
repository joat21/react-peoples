import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setIsAuthorized } from "../../redux/slices/authorizationSlice";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

import styles from "./Authorization.module.scss";

const Authorization: FC = () => {
  const dispatch = useDispatch();
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
        dispatch(setCurrentUser(data.data));
        dispatch(setIsAuthorized(true));
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
