import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  setIsAuthorized,
  setCurrentUser,
} from "../../redux/slices/currentUserSlice";

import { Gender } from "../../entities/model";

import styles from "./Registration.module.scss";

type UserData = {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  age: string;
  gender: Gender;
  city: string;
};

type RegData = UserData & { password: string };

const Registration: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [regData, setRegData] = useState<RegData>({
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    password: "",
    age: "",
    gender: Gender.MALE,
    city: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let valueToSend = value;
    if (name === "email") {
      valueToSend = valueToSend.toLowerCase();
    }

    setRegData({
      ...regData,
      [name]:
        name === "age"
          ? valueToSend === ""
            ? ""
            : Number(valueToSend)
          : valueToSend,
    });
  };

  // Эта функция добавляет этого же пользователя в список peoples
  // Этот список отображается на сайте
  // Из-за особенностей mokky.dev я не могу ограничиться списком users,
  // так как он не поддерживает пагинацию, а хотелось сделать ее через бэкенд
  // const addUserToPeoples = async (token: string, data: People) => {
  //   try {
  //     await axios.post("https://8aacc4e8fbc52395.mokky.dev/peoples", data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     dispatch(setIsAuthorized(true));
  //     navigate("/");
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response?.status === 401) {
  //       setError("Пользователь с таким email уже существует");
  //     }
  //   }
  // };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const regDataToSend = { ...regData };
    if (!regDataToSend.avatar) {
      regDataToSend.avatar =
        "https://sun3-22.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=400x400";
    }
    if (!regDataToSend.city) {
      regDataToSend.city = "Город N";
    }

    try {
      // Регистрация пользователя на сайте
      // в ответ вернется токен и пользователь
      // пользователь будет добавлен в список users, который хранит
      // всех зарегистрированных пользователей
      const { data } = await axios.post(
        "https://8aacc4e8fbc52395.mokky.dev/register",
        regDataToSend
      );

      localStorage.setItem("token", data.token);
      dispatch(setCurrentUser(data.data));
      dispatch(setIsAuthorized(true));
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError("Пользователь с таким email уже существует");
      }
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h2>Добро пожаловать в React Peoples!</h2>
        <span>сообщество каких-то людей</span>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="row">
          <input
            type="text"
            placeholder="Имя*"
            name="firstName"
            value={regData.firstName}
            onChange={onChange}
            required
          />
          <input
            type="text"
            placeholder="Фамилия*"
            name="lastName"
            value={regData.lastName}
            onChange={onChange}
            required
          />
        </div>
        <div className="row">
          <div className="row">
            <label>
              <input
                type="radio"
                name="gender"
                value={Gender.MALE}
                onChange={onChange}
                checked={regData.gender === Gender.MALE}
              />
              Мужчина
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value={Gender.FEMALE}
                onChange={onChange}
                checked={regData.gender === Gender.FEMALE}
              />
              Женщина
            </label>
          </div>
          <input
            type="number"
            placeholder="Возраст*"
            name="age"
            min={14}
            value={regData.age}
            onChange={onChange}
            required
          />
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="Ссылка на аватарку"
            name="avatar"
            value={regData.avatar}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Город"
            name="avatar"
            value={regData.avatar}
            onChange={onChange}
          />
        </div>
        <input
          type="text"
          placeholder="Email*"
          name="email"
          value={regData.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Пароль*"
          name="password"
          value={regData.password}
          onChange={onChange}
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
