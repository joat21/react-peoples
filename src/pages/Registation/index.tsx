import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  setIsAuthorized,
  setCurrentUser,
} from "../../redux/slices/currentUserSlice";

import { AuthData, Gender, RegData } from "../../entities/model";
import { DEFAULT_AVATAR } from "../../entities/constants";

import styles from "./Registration.module.scss";
import RegForm from "./components/RegForm";

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
    age: 0,
    gender: Gender.MALE,
    city: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegData({ ...regData, [name]: value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const regDataToSend = { ...regData };
    if (!regDataToSend.avatar) {
      regDataToSend.avatar = DEFAULT_AVATAR;
    }
    if (!regDataToSend.city) {
      regDataToSend.city = "Город N";
    }

    try {
      const { data, status } = await axios.post<AuthData>(
        "https://8aacc4e8fbc52395.mokky.dev/register",
        regDataToSend
      );

      if (status == 201) {
        localStorage.setItem("token", data.token);
        dispatch(setCurrentUser(data.data));
        dispatch(setIsAuthorized(true));
        navigate("/");
      }
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
      <RegForm onSubmit={onSubmit} regData={regData} onChange={onChange} />
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
