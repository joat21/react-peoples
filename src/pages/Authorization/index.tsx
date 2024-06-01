import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setIsAuthorized } from "../../redux/slices/currentUserSlice";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

import { People } from "../../entities/model";

import styles from "./Authorization.module.scss";

type AuthData = {
  token: string;
  data: People;
};

const Authorization: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let valueToSend = value;
    if (name === "email") valueToSend = valueToSend.toLowerCase();

    setAuthData({
      ...authData,
      [name]: valueToSend,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.post<AuthData>(
        "https://8aacc4e8fbc52395.mokky.dev/auth",
        authData
      );

      if (status === 201) {
        localStorage.setItem("token", data.token);
        dispatch(setCurrentUser(data.data));
        dispatch(setIsAuthorized(true));
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError(
          "Пользователь не найден. Проверьте введённые данные или зарегистрируйтесь."
        );
      } else {
        setError("Произошла ошибка. Попробуйте ещё раз.");
      }
    }
  };

  return (
    <div className={styles.root}>
      <h2>Войти в аккаунт</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={authData.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          value={authData.password}
          onChange={onChange}
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
