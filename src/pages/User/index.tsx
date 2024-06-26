import { FC, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { RootState } from "../../redux/store";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

import { People } from "../../entities/model";

import styles from "./User.module.scss";
import Skeleton from "./Skeleton";

const User: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState<People>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const getUser = async () => {
    try {
      const res = await axios.patch(
        `https://8aacc4e8fbc52395.mokky.dev/users/${id}`,
        user
      );
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return <Skeleton />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `https://8aacc4e8fbc52395.mokky.dev/users/${user.id}`,
        user
      );

      if (user.id === currentUser?.id) {
        dispatch(setCurrentUser(res.data));
      }

      alert("Изменения сохранены");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
        <button form="user-form" className="button" type="submit">
          Сохранить
        </button>
      </div>
      <form id="user-form" onSubmit={onSubmit}>
        <div className="row">
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={onChange}
          />
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={onChange}
          />
        </div>
        <div className="row">
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={onChange}
          />
          <input type="text" name="age" value={user.age} onChange={onChange} />
        </div>
        <div className="row">
          <input
            type="text"
            name="avatar"
            value={user.avatar}
            onChange={onChange}
          />
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={onChange}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default User;
