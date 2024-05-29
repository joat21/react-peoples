import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthorized } from "../../../redux/slices/authorizationSlice";
import styles from "../Header.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.profile}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <ul>
            <li>
              <Link to={`/user/${user.id}`} state={user}>
                Редактировать профиль
              </Link>
            </li>
            <li
              className={`button ${styles.btn}`}
              onClick={() => {
                dispatch(setIsAuthorized(false));
                navigate("/registration");
                localStorage.clear();
              }}
            >
              Выйти
            </li>
          </ul>
        </div>
      )}
      {/* <button
        className={`button ${styles.btn}`}
        onClick={() => {
          setIsAuthorized(false);
          navigate("/registration");
          localStorage.clear();
        }}
      >
        Выйти
      </button> */}
    </div>
  );
};

export default Profile;
