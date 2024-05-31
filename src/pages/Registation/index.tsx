import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setIsAuthorized } from "../../redux/slices/authorizationSlice";
import { setUser } from "../../redux/slices/userSlice";

import styles from "./Registration.module.scss";

const Registration = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const userDataToSend = { ...userData };
    if (!userDataToSend.avatar) {
      userDataToSend.avatar =
        "https://sun3-22.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=400x400";
    }
    const { firstName, lastName, email, avatar } = userDataToSend;

    axios
      .post("https://8aacc4e8fbc52395.mokky.dev/register", userDataToSend)
      .then((res) => res.data)
      .then((data) => {
        localStorage.setItem("token", data.token);
        dispatch(setUser(data.data));
        return localStorage.getItem("token");
      })
      .then((token) => {
        axios
          .post(
            "https://8aacc4e8fbc52395.mokky.dev/peoples",
            { firstName, lastName, email, avatar },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => res.data)
          .then(() => {
            dispatch(setIsAuthorized(true));
            navigate("/");
          });
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h2>Добро пожаловать в React Peoples!</h2>
        <span>сообщество каких-то людей</span>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Имя"
          value={userData.firstName}
          onChange={(e) =>
            setUserData({ ...userData, firstName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={userData.lastName}
          onChange={(e) =>
            setUserData({ ...userData, lastName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Ссылка на аватарку"
          value={userData.avatar}
          onChange={(e) => setUserData({ ...userData, avatar: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          required
        />
        <button className="button" type="submit">
          Создать аккаунт
        </button>
      </form>
      <span>
        Уже есть аккаунт?
        <Link className={styles.link} to="/authorization">
          Войти
        </Link>
      </span>
    </div>
  );
};

export default Registration;
