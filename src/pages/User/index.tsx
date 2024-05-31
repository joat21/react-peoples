import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../../redux/slices/currentUserSlice";

import styles from "./User.module.scss";
import axios from "axios";

const User: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    axios
      .get(`https://8aacc4e8fbc52395.mokky.dev/peoples/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data));
  }, []);

  if (!user) return "Loading";

  const onSubmit = async (e) => {
    e.preventDefault();

    axios.patch(`https://8aacc4e8fbc52395.mokky.dev/peoples/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const res = await axios.patch(
      `https://8aacc4e8fbc52395.mokky.dev/users/${user.id}`,
      user
    );

    if (user.id === currentUser.id) {
      dispatch(setCurrentUser(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
    }

    alert("Изменения сохранены");
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
        <input
          type="text"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <input
          type="text"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </form>
    </div>
  );
};

export default User;
