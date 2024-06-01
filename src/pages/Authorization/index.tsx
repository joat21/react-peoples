import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setIsAuthorized } from "../../redux/slices/currentUserSlice";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

import styles from "./Authorization.module.scss";

const Authorization: FC = () => {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://8aacc4e8fbc52395.mokky.dev/auth",
        authData
      );

      localStorage.setItem("token", data.token);
      dispatch(setCurrentUser(data.data));
      dispatch(setIsAuthorized(true));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
